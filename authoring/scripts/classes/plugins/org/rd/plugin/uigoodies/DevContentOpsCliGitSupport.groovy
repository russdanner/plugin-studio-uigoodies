package plugins.org.rd.plugin.uigoodies

import org.craftercms.studio.api.v1.constant.GitRepositories
import org.craftercms.studio.api.v1.service.GeneralLockService
import org.craftercms.studio.api.v2.utils.GitRepositoryHelper
import org.eclipse.jgit.api.Git
import org.eclipse.jgit.lib.ObjectId
import org.eclipse.jgit.lib.Ref
import org.eclipse.jgit.lib.Repository
import org.eclipse.jgit.revwalk.RevCommit
import org.eclipse.jgit.revwalk.RevWalk
import org.slf4j.Logger
import org.slf4j.LoggerFactory

import java.nio.file.Files
import java.nio.file.Path

/**
 * Remove a path from sandbox git history via {@code git filter-repo} (or filter-branch fallback),
 * then reset Studio's processed-commit pointer so sync can re-ingest the rewritten history.
 */
final class DevContentOpsCliGitSupport {

    private static final Logger LOG = LoggerFactory.getLogger(DevContentOpsCliGitSupport)

    private DevContentOpsCliGitSupport() {}

    static Map filterFileFromHistory(
        GitRepositoryHelper helper,
        def applicationContext,
        String siteId,
        String filePath,
        Map options = [:]
    ) {
        String normalized = DevContentOpsSupport.gitTreePath(DevContentOpsSupport.jsonSafeText(filePath))
        if (!isSafeRepoRelativePath(normalized)) {
            return DevContentOpsSupport.errorMap('Invalid or unsafe repository path')
        }

        if (!helper) {
            return DevContentOpsSupport.errorMap(
                'Git services are not available in Studio',
                'Requires studio.gitRepositoryHelper bean.'
            )
        }

        Path sandboxRoot
        try {
            sandboxRoot = helper.buildRepoPath(GitRepositories.SANDBOX, siteId)
        } catch (Exception e) {
            return DevContentOpsSupport.failureFromThrowable(e, 'Failed to resolve sandbox repository path')
        }

        if (!isSafeSiteRepoPath(sandboxRoot)) {
            return DevContentOpsSupport.errorMap('Resolved path is not a valid Crafter site sandbox repository')
        }

        File workTree = resolveSandboxWorkTree(helper, siteId)
        String repoPathStr = DevContentOpsSupport.plainString(workTree.absolutePath)
        String suggestedCommand = buildFilterRepoCommand(repoPathStr, normalized)

        Object sitesSvc = DevContentOpsSupport.sitesService(applicationContext)
        String previousProcessed = null
        if (sitesSvc) {
            try {
                previousProcessed = DevContentOpsSupport.plainString(sitesSvc.getLastCommitId(siteId))
            } catch (Exception ignored) {
            }
        }

        GeneralLockService lockService = applicationContext?.get('cstudioGeneralLockService') as GeneralLockService
        Map runResult = DevContentOpsStudioGitSupport.withLockedSandbox(helper, lockService, siteId) {
            return executeHistoryRewrite(helper, siteId, workTree, normalized, suggestedCommand)
        }

        if (runResult.error || runResult.success != true) {
            runResult.path = DevContentOpsSupport.jsonSafeText(normalized)
            runResult.repoPath = DevContentOpsSupport.jsonSafeText(repoPathStr)
            runResult.suggestedCommand = DevContentOpsSupport.jsonSafeText(suggestedCommand)
            runResult.lastProcessedCommitId = DevContentOpsSupport.jsonSafeText(previousProcessed ?: '')
            return runResult
        }

        String newHead = DevContentOpsSupport.plainString(runResult.headCommitId)
        String rootCommitId = DevContentOpsSupport.plainString(runResult.rootCommitId)

        Map processedUpdate = resetProcessedStateForFullReingest(
            applicationContext,
            sitesSvc,
            siteId,
            rootCommitId,
            newHead
        )

        return [
            success: true,
            inStudio: true,
            mode: DevContentOpsSupport.jsonSafeText(runResult.mode ?: 'filter-repo'),
            path: DevContentOpsSupport.jsonSafeText(normalized),
            repoPath: DevContentOpsSupport.jsonSafeText(repoPathStr),
            command: DevContentOpsSupport.jsonSafeText(suggestedCommand),
            headCommitId: DevContentOpsSupport.jsonSafeText(newHead ?: ''),
            rootCommitId: DevContentOpsSupport.jsonSafeText(rootCommitId ?: ''),
            lastProcessedCommitId: DevContentOpsSupport.jsonSafeText(previousProcessed ?: ''),
            reingestFromCommitId: DevContentOpsSupport.jsonSafeText(
                processedUpdate?.commitId ?: rootCommitId ?: ''
            ),
            processedCommitUpdate: processedUpdate,
            message: DevContentOpsSupport.jsonSafeText(
                "Removed '${normalized}' from git history" +
                    (newHead ? " (new HEAD ${newHead})" : '') +
                    '. Processed commit reset for full re-ingest and sync triggered.'
            ),
            warning: processedUpdate?.warning ? DevContentOpsSupport.jsonSafeText(processedUpdate.warning) : null
        ]
    }

    /**
     * Clear processed_commits for the site, set last_commit_id to the new history root
     * (so sync walks every rewritten commit), and trigger repository sync.
     */
    static Map resetProcessedStateForFullReingest(
        def applicationContext,
        Object sitesSvc,
        String siteId,
        String rootCommitId,
        String headCommitId
    ) {
        if (!sitesSvc) {
            return DevContentOpsSupport.errorMap('Sites service is not available to reset processed commit')
        }

        Integer deletedProcessed = null
        try {
            deletedProcessed = clearProcessedCommitsForSite(applicationContext, siteId)
        } catch (Exception e) {
            LOG.warn(
                '[uigoodies DevContentOps] Failed to clear processed_commits for site {}: {}',
                siteId,
                e.message
            )
        }

        // Prefer the rewritten history root so getCommitIdsBetween(root, head) covers all
        // descendant commits. Sync will re-ingest every new commit id after the root.
        String reingestBaseline = rootCommitId ?: ''
        if (!reingestBaseline && headCommitId) {
            // Single-commit repo after rewrite: still set HEAD so Studio has a valid pointer,
            // then sync from that point.
            reingestBaseline = headCommitId
        }

        try {
            sitesSvc.updateLastCommitId(siteId, reingestBaseline)
            Map syncResult = DevContentOpsSupport.triggerSiteSync(applicationContext, siteId)
            Map out = [
                success: true,
                commitId: reingestBaseline,
                headCommitId: headCommitId,
                deletedProcessedCommits: deletedProcessed,
                sync: syncResult,
                message: 'Cleared processed commits, set last commit to history root, and triggered sync'
            ]
            if (syncResult?.success != true) {
                out.warning = DevContentOpsSupport.jsonSafeText(
                    syncResult?.error ?: 'Repository sync was not triggered'
                )
                out.error = out.warning
            }
            return out
        } catch (Exception e) {
            return DevContentOpsSupport.failureFromThrowable(e, 'Failed to reset processed commit for re-ingest')
        }
    }

    private static Integer clearProcessedCommitsForSite(def applicationContext, String siteId) {
        def site = DevContentOpsSupport.sitesService(applicationContext)?.getSite(siteId)
        Long siteNumericId = site?.id as Long
        if (siteNumericId == null) {
            return null
        }
        def dataSource = applicationContext?.get('dataSource')
        if (!dataSource) {
            return null
        }
        def conn = dataSource.connection
        def ps = null
        try {
            conn.autoCommit = false
            ps = conn.prepareStatement('DELETE FROM processed_commits WHERE site_id = ?')
            ps.setObject(1, siteNumericId)
            int deleted = ps.executeUpdate()
            conn.commit()
            return deleted
        } catch (Exception e) {
            try {
                conn.rollback()
            } catch (Exception ignored) {
            }
            throw e
        } finally {
            try {
                ps?.close()
            } catch (Exception ignored) {
            }
            try {
                conn?.close()
            } catch (Exception ignored) {
            }
        }
    }

    private static Map executeHistoryRewrite(
        GitRepositoryHelper helper,
        String siteId,
        File workTree,
        String normalizedPath,
        String suggestedCommand
    ) {
        UigoodiesGitCliRunner runner = new UigoodiesGitCliRunner()
        String mode = 'filter-repo'
        try {
            runner.filterRepoRemovePath(workTree, normalizedPath)
        } catch (Exception filterRepoError) {
            LOG.warn(
                '[uigoodies DevContentOps] git filter-repo failed for site {} path {}: {} — trying filter-branch',
                siteId,
                normalizedPath,
                filterRepoError.message
            )
            try {
                mode = 'filter-branch'
                runner.filterBranchRemovePath(workTree, normalizedPath)
                cleanupFilterBranchBackups(helper, siteId, workTree, runner)
            } catch (Exception filterBranchError) {
                return DevContentOpsSupport.failureFromThrowable(
                    filterBranchError,
                    'Failed to remove path from git history (filter-repo and filter-branch both failed). ' +
                        "Suggested command: ${suggestedCommand}"
                )
            }
        }

        // Expire reflog + gc (best-effort) so old blobs are pruned when possible.
        try {
            runner.reflogExpireAll(workTree)
        } catch (Exception e) {
            LOG.warn('[uigoodies DevContentOps] reflog expire after history rewrite: {}', e.message)
        }
        try {
            runner.gcPruneNow(workTree)
        } catch (Exception e) {
            LOG.warn('[uigoodies DevContentOps] gc after history rewrite: {}', e.message)
        }

        // filter-repo rewrites refs/packs on disk; Studio's JGit cache must be reloaded
        // or sync will still see pre-rewrite commit ids.
        reloadSandboxRepositoryCache(helper, siteId)

        Map heads = resolveRewrittenHeads(helper, siteId)
        if (heads.error) {
            return heads
        }
        heads.mode = mode
        heads.success = true
        return heads
    }

    /**
     * Prefer Studio's private reloadSiteRepository (same path Studio uses after CLI commits).
     * Fall back to JGit scan/refresh if the private method is unavailable.
     */
    private static void reloadSandboxRepositoryCache(GitRepositoryHelper helper, String siteId) {
        try {
            helper.reloadSiteRepository(siteId, GitRepositories.SANDBOX)
            LOG.info('[uigoodies DevContentOps] Reloaded sandbox repository cache for site {}', siteId)
            return
        } catch (Exception e) {
            LOG.warn(
                '[uigoodies DevContentOps] reloadSiteRepository unavailable for site {}: {} — scanning for repo changes',
                siteId,
                e.message
            )
        }
        try {
            Repository repo = DevContentOpsSupport.openSandboxRepo(helper, siteId)
            if (repo != null) {
                repo.scanForRepoChanges()
                repo.refDatabase.refresh()
            }
        } catch (Exception e) {
            LOG.warn('[uigoodies DevContentOps] scanForRepoChanges after history rewrite: {}', e.message)
        }
    }

    private static void cleanupFilterBranchBackups(
        GitRepositoryHelper helper,
        String siteId,
        File workTree,
        UigoodiesGitCliRunner runner
    ) {
        Repository repo = null
        try {
            repo = DevContentOpsSupport.openSandboxRepo(helper, siteId)
            List<Ref> originalRefs = repo.refDatabase.getRefsByPrefix('refs/original/')
            originalRefs?.each { Ref ref ->
                try {
                    Git.wrap(repo).branchDelete().setBranchNames(ref.name).setForce(true).call()
                } catch (Exception ignored) {
                    try {
                        repo.updateRef(ref.name).delete().update()
                    } catch (Exception ignored2) {
                    }
                }
            }
        } catch (Exception e) {
            LOG.warn('[uigoodies DevContentOps] cleanup refs/original after filter-branch: {}', e.message)
        } finally {
            // Repository is shared/cached by helper; do not close.
        }
    }

    private static Map resolveRewrittenHeads(GitRepositoryHelper helper, String siteId) {
        Repository repo = null
        RevWalk walk = null
        try {
            repo = DevContentOpsSupport.openSandboxRepo(helper, siteId)
            ObjectId headId = repo.resolve('HEAD')
            if (!headId) {
                return DevContentOpsSupport.errorMap('History rewrite completed but HEAD could not be resolved')
            }
            walk = new RevWalk(repo)
            RevCommit head = walk.parseCommit(headId)
            walk.markStart(head)
            RevCommit root = head
            for (RevCommit c : walk) {
                root = c
            }
            return [
                headCommitId: DevContentOpsSupport.plainString(head.name),
                rootCommitId: DevContentOpsSupport.plainString(root.name)
            ]
        } catch (Exception e) {
            return DevContentOpsSupport.failureFromThrowable(e, 'Failed to resolve rewritten HEAD')
        } finally {
            try {
                walk?.close()
            } catch (Exception ignored) {
            }
        }
    }

    /**
     * Crafter opens sandbox repos via {@code sandbox/.git}, so JGit may report a bare repo with no work tree.
     * GitCli always expects the sandbox work tree root (directory containing {@code .git}).
     */
    static File resolveSandboxWorkTree(GitRepositoryHelper helper, String siteId) {
        try {
            Path sandboxRoot = helper.buildRepoPath(GitRepositories.SANDBOX, siteId)
            return sandboxRoot.toFile()
        } catch (Exception e) {
            throw new IllegalStateException("Failed to resolve sandbox work tree for site: ${siteId}", e)
        }
    }

    static String buildFilterRepoCommand(String repoPathStr, String normalizedPath) {
        return "git -C ${shellEscape(repoPathStr)} filter-repo --path ${shellEscape(normalizedPath)} --invert-paths --force"
    }

    private static String shellEscape(String arg) {
        if (arg == null) {
            return "''"
        }
        return "'" + String.valueOf(arg).replace("'", "'\\''") + "'"
    }

    static boolean isSafeRepoRelativePath(String path) {
        if (!path?.trim()) {
            return false
        }
        String normalized = path.replace('\\', '/').replaceAll('^/+', '')
        if (!normalized || normalized.contains('..')) {
            return false
        }
        if (normalized == '.git' || normalized.startsWith('.git/')) {
            return false
        }
        return true
    }

    static boolean isSafeSiteRepoPath(Path repoPath) {
        if (!repoPath) {
            return false
        }
        String normalized = repoPath.toAbsolutePath().normalize().toString().replace('\\', '/')
        if (!normalized.endsWith('/sandbox')) {
            return false
        }
        String withoutSandbox = normalized.substring(0, normalized.length() - '/sandbox'.length())
        return withoutSandbox.contains('/repos/sites/') &&
            !withoutSandbox.endsWith('/repos/sites/') &&
            !withoutSandbox.endsWith('/repos/sites')
    }
}
