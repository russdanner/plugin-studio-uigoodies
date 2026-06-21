package plugins.org.rd.plugin.uigoodies

import org.craftercms.studio.api.v1.service.GeneralLockService
import org.craftercms.studio.api.v2.exception.git.cli.GitCliException
import org.craftercms.studio.api.v2.utils.GitRepositoryHelper
import org.eclipse.jgit.api.Git
import org.eclipse.jgit.lib.Repository

/**
 * Sandbox-safe git operations: prefer Crafter Studio beans ({@code studio.gitCli},
 * {@link GitRepositoryHelper}), then JGit or host CLI instructions when Studio has no API.
 */
final class DevContentOpsStudioGitSupport {

    private DevContentOpsStudioGitSupport() {}

    static Object gitCli(def applicationContext) {
        return applicationContext?.get('studio.gitCli')
    }

    static File sandboxWorkTree(GitRepositoryHelper helper, String siteId) {
        return DevContentOpsCliGitSupport.resolveSandboxWorkTree(helper, siteId)
    }

    static Map withLockedSandbox(
        GitRepositoryHelper helper,
        GeneralLockService lockService,
        String siteId,
        Closure<Map> work
    ) {
        if (!helper || !lockService) {
            return DevContentOpsSupport.errorMap(
                'Git services are not available in Studio',
                'Requires studio.gitRepositoryHelper and cstudioGeneralLockService beans.'
            )
        }
        String lockKey = helper.getSandboxRepoLockKey(siteId)
        boolean locked = false
        try {
            lockService.lock(lockKey)
            locked = true
            Map result = work.call() as Map
            return result ?: DevContentOpsSupport.errorMap('Git operation failed')
        } finally {
            if (locked) {
                try {
                    lockService.unlock(lockKey)
                } catch (Exception ignored) {
                }
            }
        }
    }

    static boolean isRepoClean(Object gitCli, File workTree) {
        if (!gitCli || !workTree) {
            return false
        }
        try {
            return gitCli.isRepoClean(workTree) as boolean
        } catch (GitCliException ignored) {
            return false
        }
    }

    static boolean gitStatusOk(GitRepositoryHelper helper, Repository repo) {
        if (!helper || !repo) {
            return false
        }
        try {
            return helper.gitStatusOk(repo)
        } catch (Exception ignored) {
            return false
        }
    }

    static void cleanWorkTree(Object gitCli, File workTree, boolean force = true, boolean recursive = true) {
        gitCli.clean(workTree, force, recursive)
    }

    static void resetHardWorkTree(Object gitCli, File workTree) {
        gitCli.resetHard(workTree)
    }

    static void removeIndexAndClean(GitRepositoryHelper helper, File workTree) {
        helper.removeIndexAndClean(workTree)
    }

    static void runJGitGc(Repository repo, boolean aggressive = false) {
        Git git = Git.wrap(repo)
        def cmd = git.gc()
        if (aggressive) {
            cmd.setAggressive(true)
        }
        cmd.call()
    }

    static Map externalGitHint(String operation, String command, String title, String hint) {
        return [
            success: false,
            mode: 'external',
            operation: DevContentOpsSupport.jsonSafeText(operation),
            command: DevContentOpsSupport.jsonSafeText(command),
            error: DevContentOpsSupport.jsonSafeText(title),
            hint: DevContentOpsSupport.jsonSafeText(hint)
        ]
    }

    static Map optimizeResult(String operation, String engine, String command, String message, Map extra = [:]) {
        Map result = [
            success: true,
            mode: DevContentOpsSupport.jsonSafeText(engine),
            operation: DevContentOpsSupport.jsonSafeText(operation),
            command: DevContentOpsSupport.jsonSafeText(command),
            message: DevContentOpsSupport.jsonSafeText(message)
        ]
        extra?.each { k, v -> result[k] = v }
        return result
    }

    static Map runtimeGitChecks(GitRepositoryHelper helper, Object gitCli, Repository repo, File workTree) {
        return [
            gitStatusOk: gitStatusOk(helper, repo),
            workTreeClean: gitCli ? isRepoClean(gitCli, workTree) : null
        ]
    }
}
