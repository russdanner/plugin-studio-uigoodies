package plugins.org.rd.plugin.uigoodies

import org.craftercms.studio.api.v1.service.GeneralLockService
import org.craftercms.studio.api.v2.repository.ContentRepository
import org.craftercms.studio.api.v2.utils.GitRepositoryHelper
import org.eclipse.jgit.api.CheckoutCommand
import org.eclipse.jgit.api.Git
import org.eclipse.jgit.api.Status
import org.eclipse.jgit.diff.DiffEntry
import org.eclipse.jgit.diff.DiffFormatter
import org.eclipse.jgit.diff.RawTextComparator
import org.eclipse.jgit.lib.ObjectId
import org.eclipse.jgit.lib.Repository
import org.eclipse.jgit.revwalk.RevCommit

import java.nio.charset.StandardCharsets

/**
 * Sandbox working tree inspection and maintenance (JGit + Studio GitCli).
 */
final class DevContentOpsWorkTreeSupport {

    private DevContentOpsWorkTreeSupport() {}

    static Map fetchWorkTree(
        GitRepositoryHelper helper,
        ContentRepository contentRepo,
        def applicationContext,
        String siteId,
        String branch = ''
    ) {
        if (!helper || !contentRepo) {
            return DevContentOpsSupport.errorMap('Git services are not available in Studio')
        }
        GeneralLockService lockService = applicationContext?.get('cstudioGeneralLockService') as GeneralLockService
        return DevContentOpsStudioGitSupport.withLockedSandbox(helper, lockService, siteId) {
            Repository repo = null
            try {
                repo = DevContentOpsSupport.openSandboxRepo(helper, siteId)
                Map base = DevContentOpsSupport.fetchRepoStatus(
                    helper, contentRepo, siteId, branch, DevContentOpsSupport.sitesService(applicationContext), applicationContext
                )
                if (base.error) {
                    return base
                }
                Git git = Git.wrap(repo)
                Status status = git.status().call()
                List<Map> files = buildFileRows(status)
                int conflictCount = files.count { it.conflict as boolean }
                return DevContentOpsSupport.withSiteId(siteId, [
                    success: true,
                    siteId: DevContentOpsSupport.jsonSafeText(siteId),
                    branch: base.branch,
                    sandboxBranch: base.sandboxBranch,
                    headCommitId: base.headCommitId,
                    branchHeadCommitId: base.branchHeadCommitId,
                    lastProcessedCommitId: base.lastProcessedCommitId,
                    unprocessedCount: base.unprocessedCount,
                    gitStatusOk: base.gitStatusOk,
                    workTreeClean: base.workTreeClean,
                    repoPath: DevContentOpsSupport.jsonSafeText(
                        DevContentOpsStudioGitSupport.sandboxWorkTree(helper, siteId).absolutePath
                    ),
                    conflictCount: conflictCount,
                    hasChanges: !files.isEmpty(),
                    files: files
                ])
            } catch (Exception e) {
                return DevContentOpsSupport.failureFromThrowable(e, 'Failed to load working tree')
            } finally {
                closeQuietly(repo)
            }
        }
    }

    static Map fetchWorkTreeDiff(Repository repo, String path, String mode = 'unstaged') {
        String treePath = DevContentOpsSupport.gitTreePath(DevContentOpsSupport.jsonSafeText(path))
        if (!DevContentOpsCliGitSupport.isSafeRepoRelativePath(treePath)) {
            return DevContentOpsSupport.errorMap('Invalid or unsafe repository path')
        }
        try {
            Git git = Git.wrap(repo)
            String safeMode = DevContentOpsSupport.jsonSafeText(mode)
            List<DiffEntry> entries
            if (safeMode == 'staged') {
                entries = git.diff().setCached(true).addPath(treePath).call()
            } else {
                entries = git.diff().addPath(treePath).call()
            }
            return formatDiffEntries(repo, entries, safeMode == 'staged' ? 'INDEX' : 'WORKTREE', 'HEAD', treePath)
        } catch (Exception e) {
            return DevContentOpsSupport.failureFromThrowable(e, 'Failed to diff working tree file')
        }
    }

    static Map stagePaths(GitRepositoryHelper helper, def applicationContext, String siteId, List paths, boolean all = false) {
        return withRepo(helper, applicationContext, siteId) { repo, git ->
            List<String> normalized = normalizePaths(paths)
            if (!all && normalized.isEmpty()) {
                return DevContentOpsSupport.errorMap('No valid paths to stage')
            }
            Status status = git.status().call()
            List<String> targets = all ? listStageablePaths(status) : normalized
            if (targets.isEmpty()) {
                return [success: true, message: 'Nothing to stage', stagedCount: 0]
            }
            targets.each { path ->
                git.add().addPath(path).call()
            }
            return [
                success: true,
                message: "Staged ${targets.size()} file(s)",
                stagedCount: targets.size(),
                paths: targets.collect { DevContentOpsSupport.jsonSafeText(it) }
            ]
        }
    }

    static Map unstagePaths(GitRepositoryHelper helper, def applicationContext, String siteId, List paths, boolean all = false) {
        return withRepo(helper, applicationContext, siteId) { repo, git ->
            List<String> normalized = normalizePaths(paths)
            Status status = git.status().call()
            List<String> targets = all ? listStagedPaths(status) : normalized
            if (targets.isEmpty()) {
                return [success: true, message: 'Nothing to unstage', unstagedCount: 0]
            }
            targets.each { path ->
                git.reset().addPath(path).call()
            }
            return [
                success: true,
                message: "Unstaged ${targets.size()} file(s)",
                unstagedCount: targets.size(),
                paths: targets.collect { DevContentOpsSupport.jsonSafeText(it) }
            ]
        }
    }

    static Map discardPaths(GitRepositoryHelper helper, def applicationContext, String siteId, List paths, boolean all = false) {
        return withRepo(helper, applicationContext, siteId) { repo, git ->
            List<String> normalized = normalizePaths(paths)
            Status status = git.status().call()
            List<String> targets = all ? listDiscardablePaths(status) : normalized
            if (targets.isEmpty()) {
                return [success: true, message: 'Nothing to discard', discardedCount: 0]
            }
            targets.each { path ->
                if (status.getUntracked()?.contains(path)) {
                    git.clean().setForce(true).setPaths([path]).call()
                } else {
                    git.checkout().addPath(path).call()
                }
            }
            return [
                success: true,
                message: "Discarded changes for ${targets.size()} file(s)",
                discardedCount: targets.size(),
                paths: targets.collect { DevContentOpsSupport.jsonSafeText(it) }
            ]
        }
    }

    static Map cleanWorkTree(GitRepositoryHelper helper, def applicationContext, String siteId, List paths, boolean allUntracked = false) {
        GeneralLockService lockService = applicationContext?.get('cstudioGeneralLockService') as GeneralLockService
        Object cli = DevContentOpsSupport.gitCli(applicationContext)
        File workTree = DevContentOpsStudioGitSupport.sandboxWorkTree(helper, siteId)
        return DevContentOpsStudioGitSupport.withLockedSandbox(helper, lockService, siteId) {
            Repository repo = null
            try {
                if (allUntracked && cli) {
                    DevContentOpsStudioGitSupport.cleanWorkTree(cli, workTree, true, true)
                    return [
                        success: true,
                        message: 'Removed untracked files and directories from the working tree'
                    ]
                }
                repo = DevContentOpsSupport.openSandboxRepo(helper, siteId)
                Git git = Git.wrap(repo)
                List<String> normalized = normalizePaths(paths)
                if (normalized.isEmpty()) {
                    return DevContentOpsSupport.errorMap('No valid paths to clean')
                }
                Set<String> cleaned = git.clean().setForce(true).setPaths(normalized).call()
                return [
                    success: true,
                    message: "Removed ${cleaned?.size() ?: 0} untracked path(s)",
                    cleanedCount: cleaned?.size() ?: 0,
                    paths: normalized.collect { DevContentOpsSupport.jsonSafeText(it) }
                ]
            } catch (Exception e) {
                return DevContentOpsSupport.failureFromThrowable(e, 'Failed to clean working tree')
            } finally {
                closeQuietly(repo)
            }
        }
    }

    static Map commitWorkTree(GitRepositoryHelper helper, def applicationContext, String siteId, String message) {
        return withRepo(helper, applicationContext, siteId) { repo, git ->
            String commitMessage = DevContentOpsSupport.plainString(message)?.trim()
            if (!commitMessage) {
                return DevContentOpsSupport.errorMap('Commit message is required')
            }
            Status status = git.status().call()
            if (listStagedPaths(status).isEmpty()) {
                return DevContentOpsSupport.errorMap('No staged changes to commit. Stage files first.')
            }
            RevCommit commit = git.commit().setMessage(commitMessage).call()
            return [
                success: true,
                message: 'Commit created in sandbox repository',
                commitId: DevContentOpsSupport.jsonSafeText(commit?.name()),
                shortId: DevContentOpsSupport.jsonSafeText(
                    commit?.name()?.length() >= 7 ? commit.name().substring(0, 7) : commit?.name()
                )
            ]
        }
    }

    static Map resolveConflict(
        GitRepositoryHelper helper,
        def applicationContext,
        String siteId,
        String path,
        String strategy
    ) {
        return withRepo(helper, applicationContext, siteId) { repo, git ->
            String treePath = DevContentOpsSupport.gitTreePath(DevContentOpsSupport.jsonSafeText(path))
            if (!DevContentOpsCliGitSupport.isSafeRepoRelativePath(treePath)) {
                return DevContentOpsSupport.errorMap('Invalid or unsafe repository path')
            }
            Status status = git.status().call()
            if (!status.getConflicting()?.contains(treePath)) {
                return DevContentOpsSupport.errorMap('Path is not in a conflicted state')
            }
            String normalizedStrategy = DevContentOpsSupport.jsonSafeText(strategy ?: 'ours').toLowerCase()
            CheckoutCommand.Stage stage = normalizedStrategy == 'theirs'
                ? CheckoutCommand.Stage.THEIRS
                : CheckoutCommand.Stage.OURS
            git.checkout().setStage(stage).addPath(treePath).call()
            git.add().addPath(treePath).call()
            return [
                success: true,
                message: "Marked conflict resolved using ${normalizedStrategy == 'theirs' ? 'incoming' : 'current branch'} version",
                path: DevContentOpsSupport.jsonSafeText(treePath),
                strategy: DevContentOpsSupport.jsonSafeText(normalizedStrategy)
            ]
        }
    }

    static Map resetHardWorkTree(GitRepositoryHelper helper, def applicationContext, String siteId) {
        GeneralLockService lockService = applicationContext?.get('cstudioGeneralLockService') as GeneralLockService
        Object cli = DevContentOpsSupport.gitCli(applicationContext)
        if (!cli) {
            return DevContentOpsSupport.errorMap('This maintenance operation is not available in this Studio environment')
        }
        File workTree = DevContentOpsStudioGitSupport.sandboxWorkTree(helper, siteId)
        return DevContentOpsStudioGitSupport.withLockedSandbox(helper, lockService, siteId) {
            DevContentOpsStudioGitSupport.resetHardWorkTree(cli, workTree)
            return [success: true, message: 'Working tree reset to HEAD']
        }
    }

    private static Map withRepo(
        GitRepositoryHelper helper,
        def applicationContext,
        String siteId,
        Closure<Map> work
    ) {
        GeneralLockService lockService = applicationContext?.get('cstudioGeneralLockService') as GeneralLockService
        return DevContentOpsStudioGitSupport.withLockedSandbox(helper, lockService, siteId) {
            Repository repo = null
            try {
                repo = DevContentOpsSupport.openSandboxRepo(helper, siteId)
                Git git = Git.wrap(repo)
                Map result = work.call(repo, git) as Map
                return result ?: DevContentOpsSupport.errorMap('Working tree operation failed')
            } catch (Exception e) {
                return DevContentOpsSupport.failureFromThrowable(e, 'Working tree operation failed')
            } finally {
                closeQuietly(repo)
            }
        }
    }

    private static List<Map> buildFileRows(Status status) {
        Set<String> paths = new LinkedHashSet<>()
        paths.addAll(status.getConflicting() ?: [])
        paths.addAll(status.getUncommittedChanges() ?: [])
        paths.addAll(status.getUntracked() ?: [])

        List<Map> rows = []
        paths.each { String path ->
            boolean conflict = status.getConflicting()?.contains(path)
            boolean stagedAdded = status.getAdded()?.contains(path)
            boolean stagedChanged = status.getChanged()?.contains(path)
            boolean stagedRemoved = status.getRemoved()?.contains(path)
            boolean unstagedModified = status.getModified()?.contains(path)
            boolean unstagedMissing = status.getMissing()?.contains(path)
            boolean untracked = status.getUntracked()?.contains(path)

            String stagedStatus = null
            if (conflict) {
                stagedStatus = 'conflict'
            } else if (stagedAdded) {
                stagedStatus = 'added'
            } else if (stagedRemoved) {
                stagedStatus = 'removed'
            } else if (stagedChanged) {
                stagedStatus = 'modified'
            }

            String workTreeStatus = null
            if (conflict) {
                workTreeStatus = 'conflict'
            } else if (untracked) {
                workTreeStatus = 'untracked'
            } else if (unstagedMissing) {
                workTreeStatus = 'deleted'
            } else if (unstagedModified) {
                workTreeStatus = 'modified'
            }

            rows << [
                path: DevContentOpsSupport.jsonSafeText(path),
                staged: stagedAdded || stagedChanged || stagedRemoved,
                conflict: conflict,
                stagedStatus: DevContentOpsSupport.jsonSafeText(stagedStatus ?: ''),
                workTreeStatus: DevContentOpsSupport.jsonSafeText(workTreeStatus ?: ''),
                status: DevContentOpsSupport.jsonSafeText(describeStatus(conflict, stagedStatus, workTreeStatus))
            ]
        }
        rows.sort { a, b -> (a.path as String) <=> (b.path as String) }
        return rows
    }

    private static String describeStatus(boolean conflict, String stagedStatus, String workTreeStatus) {
        if (conflict) {
            return 'conflict'
        }
        if (stagedStatus && workTreeStatus) {
            return "${stagedStatus}+${workTreeStatus}"
        }
        if (stagedStatus) {
            return "staged ${stagedStatus}"
        }
        if (workTreeStatus) {
            return workTreeStatus
        }
        return 'changed'
    }

    private static List<String> listStageablePaths(Status status) {
        Set<String> paths = new LinkedHashSet<>()
        paths.addAll(status.getModified() ?: [])
        paths.addAll(status.getUntracked() ?: [])
        paths.addAll(status.getMissing() ?: [])
        paths.addAll(status.getChanged() ?: [])
        paths.addAll(status.getRemoved() ?: [])
        paths.removeAll(status.getConflicting() ?: [])
        return paths as List
    }

    private static List<String> listStagedPaths(Status status) {
        Set<String> paths = new LinkedHashSet<>()
        paths.addAll(status.getAdded() ?: [])
        paths.addAll(status.getChanged() ?: [])
        paths.addAll(status.getRemoved() ?: [])
        return paths as List
    }

    private static List<String> listDiscardablePaths(Status status) {
        Set<String> paths = new LinkedHashSet<>()
        paths.addAll(status.getModified() ?: [])
        paths.addAll(status.getMissing() ?: [])
        paths.addAll(status.getUntracked() ?: [])
        paths.removeAll(status.getConflicting() ?: [])
        return paths as List
    }

    private static List<String> normalizePaths(List raw) {
        List<String> out = []
        raw?.each { item ->
            String treePath = DevContentOpsSupport.gitTreePath(DevContentOpsSupport.jsonSafeText(item))
            if (DevContentOpsCliGitSupport.isSafeRepoRelativePath(treePath)) {
                out << treePath
            }
        }
        return out.unique()
    }

    private static Map formatDiffEntries(Repository repo, List<DiffEntry> entries, String fromLabel, String toLabel, String pathFilter) {
        ByteArrayOutputStream combined = new ByteArrayOutputStream()
        List<Map> fileDiffs = []
        entries?.each { DiffEntry entry ->
            ByteArrayOutputStream fileOut = new ByteArrayOutputStream()
            DiffFormatter formatter = new DiffFormatter(fileOut)
            formatter.setRepository(repo)
            formatter.setDiffComparator(RawTextComparator.DEFAULT)
            formatter.setDetectRenames(true)
            formatter.format(entry)
            formatter.close()
            String raw = fileOut.toString(StandardCharsets.UTF_8.name())
            if (raw) {
                combined.write(raw.getBytes(StandardCharsets.UTF_8))
                if (!raw.endsWith('\n')) {
                    combined.write('\n'.getBytes(StandardCharsets.UTF_8))
                }
            }
            fileDiffs << [
                changeType: entry.getChangeType().name(),
                path: DevContentOpsSupport.jsonSafeText(
                    entry.getChangeType() == DiffEntry.ChangeType.DELETE ? entry.getOldPath() : entry.getNewPath()
                ),
                oldPath: DevContentOpsSupport.jsonSafeText(entry.getOldPath()),
                newPath: DevContentOpsSupport.jsonSafeText(entry.getNewPath()),
                diff: DevContentOpsSupport.jsonSafeContent(raw),
                lines: DevContentOpsSupport.parseDiffLines(raw)
            ]
        }
        return [
            from: DevContentOpsSupport.jsonSafeText(fromLabel),
            to: DevContentOpsSupport.jsonSafeText(toLabel),
            path: DevContentOpsSupport.jsonSafeText(pathFilter),
            diff: DevContentOpsSupport.jsonSafeContent(combined.toString(StandardCharsets.UTF_8.name())),
            files: fileDiffs.collect { [changeType: it.changeType, path: it.path] },
            fileDiffs: fileDiffs
        ]
    }

    private static void closeQuietly(Repository repo) {
        if (repo) {
            try {
                repo.close()
            } catch (Exception ignored) {
            }
        }
    }
}
