package plugins.org.rd.plugin.uigoodies

import org.craftercms.studio.api.v1.service.GeneralLockService
import org.craftercms.studio.api.v2.utils.GitRepositoryHelper
import org.eclipse.jgit.api.Git
import org.eclipse.jgit.api.ListBranchCommand
import org.eclipse.jgit.lib.ObjectId
import org.eclipse.jgit.lib.Ref
import org.eclipse.jgit.lib.Repository
import org.eclipse.jgit.revwalk.RevCommit
import org.eclipse.jgit.revwalk.RevWalk
import org.eclipse.jgit.transport.RefSpec
import org.slf4j.Logger
import org.slf4j.LoggerFactory

/**
 * Branch and tag management for DevContentOps Tools (JGit + sandbox lock).
 */
final class DevContentOpsRefsSupport {

    private static final Logger LOG = LoggerFactory.getLogger(DevContentOpsRefsSupport)

    private DevContentOpsRefsSupport() {}

    static Map listRefs(GitRepositoryHelper helper, Object sitesSvc, String siteId) {
        if (!helper) {
            return DevContentOpsSupport.errorMap('Git services are not available in Studio')
        }
        Repository repo = null
        try {
            repo = DevContentOpsSupport.openSandboxRepo(helper, siteId)
            Git git = Git.wrap(repo)
            String currentBranch = DevContentOpsSupport.plainString(repo.branch) ?: ''
            String sandboxBranch = resolveSandboxBranch(sitesSvc, siteId)
            List<String> remotes = listRemoteNames(git)

            List<Map> branches = []
            git.branchList().setListMode(ListBranchCommand.ListMode.ALL).call().each { Ref ref ->
                if (!ref.name?.startsWith('refs/heads/')) {
                    return
                }
                String name = ref.name.substring('refs/heads/'.length())
                branches << refRow(repo, name, ref.objectId, name == currentBranch)
            }

            List<Map> tags = []
            git.tagList().call().each { Ref ref ->
                if (!ref.name?.startsWith('refs/tags/')) {
                    return
                }
                String name = ref.name.substring('refs/tags/'.length())
                tags << refRow(repo, name, ref.objectId, false)
            }

            List<Map> remoteBranches = []
            repo.refDatabase.getRefsByPrefix('refs/remotes/').each { Ref ref ->
                String refName = ref?.name
                if (!refName || refName.endsWith('/HEAD')) {
                    return
                }
                String shortName = refName.startsWith('refs/remotes/') ? refName.substring('refs/remotes/'.length()) : refName
                String remote = ''
                int slash = shortName.indexOf('/')
                if (slash > 0) {
                    remote = shortName.substring(0, slash)
                }
                remoteBranches << [
                    name: DevContentOpsSupport.jsonSafeText(shortName),
                    remote: DevContentOpsSupport.jsonSafeText(remote),
                    commit: DevContentOpsSupport.jsonSafeText(shortObjectId(ref.objectId)),
                    subject: commitSubject(repo, ref.objectId)
                ]
            }

            return DevContentOpsSupport.withSiteId(siteId, [
                success: true,
                mode: 'jgit',
                currentBranch: DevContentOpsSupport.jsonSafeText(currentBranch),
                sandboxBranch: DevContentOpsSupport.jsonSafeText(sandboxBranch),
                remotes: remotes.collect { DevContentOpsSupport.jsonSafeText(it) },
                branches: branches,
                tags: tags,
                remoteBranches: remoteBranches
            ])
        } catch (Exception e) {
            return DevContentOpsSupport.failureFromThrowable(e, 'Failed to list branches and tags')
        } finally {
            closeQuietly(repo)
        }
    }

    static Map createBranch(
        GitRepositoryHelper helper,
        def applicationContext,
        String siteId,
        String name,
        String startPoint,
        boolean force
    ) {
        return withLockedRepo(helper, applicationContext, siteId, 'createBranch') { Git git, Repository repo ->
            String refName = DevContentOpsSupport.jsonSafeText(name)?.trim()
            if (!isValidRefName(refName)) {
                return DevContentOpsSupport.errorMap('Invalid branch name')
            }
            String start = DevContentOpsSupport.jsonSafeText(startPoint)?.trim()
            def cmd = git.branchCreate().setName(refName)
            if (start) {
                cmd.setStartPoint(start)
            }
            if (force) {
                cmd.setForce(true)
            } else {
                cmd.setForce(false)
            }
            cmd.call()
            return refResult('createBranch', "Branch \"${refName}\" created", refName)
        }
    }

    static Map createTag(
        GitRepositoryHelper helper,
        def applicationContext,
        String siteId,
        String name,
        String commit,
        String message,
        boolean annotated
    ) {
        return withLockedRepo(helper, applicationContext, siteId, 'createTag') { Git git, Repository repo ->
            String refName = DevContentOpsSupport.jsonSafeText(name)?.trim()
            if (!isValidRefName(refName)) {
                return DevContentOpsSupport.errorMap('Invalid tag name')
            }
            String target = DevContentOpsSupport.jsonSafeText(commit)?.trim() ?: 'HEAD'
            String tagMessage = DevContentOpsSupport.jsonSafeText(message)?.trim()
            if (annotated && !tagMessage) {
                return DevContentOpsSupport.errorMap('Annotated tags require a message')
            }
            ObjectId objectId = repo.resolve(target)
            if (!objectId) {
                return DevContentOpsSupport.errorMap("Commit not found: ${target}")
            }
            def cmd = git.tag().setName(refName).setObjectId(objectId)
            if (annotated) {
                cmd.setMessage(tagMessage)
            }
            cmd.call()
            return refResult('createTag', "Tag \"${refName}\" created", refName)
        }
    }

    static Map deleteBranch(
        GitRepositoryHelper helper,
        def applicationContext,
        Object sitesSvc,
        String siteId,
        String name,
        boolean force,
        boolean deleteLocal,
        boolean deleteRemote,
        String remoteName
    ) {
        return withLockedRepo(helper, applicationContext, siteId, 'deleteBranch') { Git git, Repository repo ->
            String refName = DevContentOpsSupport.jsonSafeText(name)?.trim()
            if (!isValidRefName(refName)) {
                return DevContentOpsSupport.errorMap('Invalid branch name')
            }
            if (!deleteLocal && !deleteRemote) {
                return DevContentOpsSupport.errorMap('Select local delete, remote delete, or both')
            }

            String currentBranch = DevContentOpsSupport.plainString(repo.branch) ?: ''
            String sandboxBranch = resolveSandboxBranch(sitesSvc, siteId)
            if (deleteLocal && refName == currentBranch) {
                return DevContentOpsSupport.errorMap('Cannot delete the currently checked-out branch')
            }
            if (deleteLocal && refName == sandboxBranch && !force) {
                return DevContentOpsSupport.errorMap(
                    'Refusing to delete the site sandbox branch without force',
                    "Sandbox branch is \"${sandboxBranch}\"."
                )
            }

            List<String> actions = []
            if (deleteLocal) {
                git.branchDelete().setBranchNames(refName).setForce(force).call()
                actions << (force ? 'local force delete' : 'local delete')
            }
            if (deleteRemote) {
                String remote = resolveRemote(git, remoteName)
                try {
                    git.push().setRemote(remote).setRefSpecs(new RefSpec(":refs/heads/${refName}")).call()
                    actions << "remote delete (${remote})"
                } catch (Exception e) {
                    return DevContentOpsSupport.errorMap(
                        "Remote branch delete failed: ${e.message}",
                        'Remote delete requires a configured remote with credentials Studio can use (SSH key or stored credentials). Unauthenticated remotes only.'
                    )
                }
            }

            return refResult('deleteBranch', "Branch \"${refName}\": ${actions.join(', ')}", refName)
        }
    }

    static Map deleteTag(
        GitRepositoryHelper helper,
        def applicationContext,
        String siteId,
        String name,
        boolean deleteLocal,
        boolean deleteRemote,
        String remoteName
    ) {
        return withLockedRepo(helper, applicationContext, siteId, 'deleteTag') { Git git, Repository repo ->
            String refName = DevContentOpsSupport.jsonSafeText(name)?.trim()
            if (!isValidRefName(refName)) {
                return DevContentOpsSupport.errorMap('Invalid tag name')
            }
            if (!deleteLocal && !deleteRemote) {
                return DevContentOpsSupport.errorMap('Select local delete, remote delete, or both')
            }

            List<String> actions = []
            if (deleteLocal) {
                git.tagDelete().setTags(refName).call()
                actions << 'local delete'
            }
            if (deleteRemote) {
                String remote = resolveRemote(git, remoteName)
                try {
                    git.push().setRemote(remote).setRefSpecs(new RefSpec(":refs/tags/${refName}")).call()
                    actions << "remote delete (${remote})"
                } catch (Exception e) {
                    return DevContentOpsSupport.errorMap(
                        "Remote tag delete failed: ${e.message}",
                        'Remote delete requires a configured remote with credentials Studio can use (SSH key or stored credentials). Unauthenticated remotes only.'
                    )
                }
            }

            return refResult('deleteTag', "Tag \"${refName}\": ${actions.join(', ')}", refName)
        }
    }

    private static Map withLockedRepo(
        GitRepositoryHelper helper,
        def applicationContext,
        String siteId,
        String operation,
        Closure<Map> work
    ) {
        GeneralLockService lockService = applicationContext?.get('cstudioGeneralLockService') as GeneralLockService
        if (!helper || !lockService) {
            return DevContentOpsSupport.errorMap(
                'Git services are not available in Studio',
                'Requires studio.gitRepositoryHelper and cstudioGeneralLockService beans.'
            )
        }

        Repository repo = null
        String lockKey = helper.getSandboxRepoLockKey(siteId)
        boolean locked = false

        try {
            repo = DevContentOpsSupport.openSandboxRepo(helper, siteId)
            Git git = Git.wrap(repo)
            lockService.lock(lockKey)
            locked = true
            Map result = work.call(git, repo) as Map
            if (result && !result.error) {
                result.operation = DevContentOpsSupport.jsonSafeText(operation)
                result.mode = 'jgit'
            }
            return result ?: DevContentOpsSupport.errorMap('Ref operation failed')
        } catch (Exception e) {
            LOG.error('[uigoodies DevContentOps] {} failed for site {}: {}', operation, siteId, e.message, e)
            return DevContentOpsSupport.failureFromThrowable(e, 'Ref operation failed')
        } finally {
            if (locked) {
                try {
                    lockService.unlock(lockKey)
                } catch (Exception unlockError) {
                    LOG.warn('[uigoodies DevContentOps] Failed to unlock {}: {}', lockKey, unlockError.message)
                }
            }
            closeQuietly(repo)
        }
    }

    private static Map refRow(Repository repo, String name, ObjectId objectId, boolean current) {
        return [
            name: DevContentOpsSupport.jsonSafeText(name),
            commit: DevContentOpsSupport.jsonSafeText(shortObjectId(objectId)),
            subject: commitSubject(repo, objectId),
            current: current
        ]
    }

    private static String commitSubject(Repository repo, ObjectId objectId) {
        if (!repo || !objectId) {
            return ''
        }
        RevWalk walk = new RevWalk(repo)
        try {
            RevCommit commit = walk.parseCommit(objectId)
            return DevContentOpsSupport.jsonSafeText(commit.shortMessage ?: '')
        } catch (Exception ignored) {
            return ''
        } finally {
            walk.close()
        }
    }

    private static String shortObjectId(ObjectId objectId) {
        String id = DevContentOpsSupport.plainString(objectId?.name())
        if (!id) {
            return ''
        }
        return id.length() > 8 ? id.substring(0, 8) : id
    }

    private static List<String> listRemoteNames(Git git) {
        List<String> remotes = []
        try {
            git.remoteList().call()?.each { remoteConfig ->
                String name = DevContentOpsSupport.plainString(remoteConfig.name)
                if (name) {
                    remotes.add(name)
                }
            }
        } catch (Exception ignored) {
        }
        return remotes
    }

    private static Map refResult(String operation, String message, String refName) {
        return [
            success: true,
            mode: 'jgit',
            operation: DevContentOpsSupport.jsonSafeText(operation),
            refName: DevContentOpsSupport.jsonSafeText(refName),
            message: DevContentOpsSupport.jsonSafeText(message)
        ]
    }

    private static String resolveRemote(Git git, String remoteName) {
        String requested = DevContentOpsSupport.plainString(remoteName)?.trim()
        if (requested) {
            return requested
        }
        List<String> remotes = listRemoteNames(git)
        return remotes ? remotes[0] : 'origin'
    }

    private static String resolveSandboxBranch(Object sitesSvc, String siteId) {
        if (!sitesSvc) {
            return 'master'
        }
        try {
            def site = sitesSvc.getSite(siteId)
            return DevContentOpsSupport.jsonSafeText(site?.sandboxBranch) ?: 'master'
        } catch (Exception ignored) {
            return 'master'
        }
    }

    private static void closeQuietly(Repository repo) {
        if (repo) {
            try {
                repo.close()
            } catch (Exception ignored) {
            }
        }
    }

    static boolean isValidRefName(String name) {
        if (!name?.trim()) {
            return false
        }
        String n = name.trim()
        if (n.contains('..') || n.contains(' ') || n.contains('@{') ||
            n.contains(':') || n.contains('~') || n.contains('^') ||
            n.contains('?') || n.contains('*') || n.contains('[') ||
            n.contains('\\')) {
            return false
        }
        if (n.startsWith('/') || n.endsWith('/') || n.endsWith('.')) {
            return false
        }
        if (n == '.git' || n.startsWith('.git/')) {
            return false
        }
        if (n.length() > 255) {
            return false
        }
        return true
    }
}
