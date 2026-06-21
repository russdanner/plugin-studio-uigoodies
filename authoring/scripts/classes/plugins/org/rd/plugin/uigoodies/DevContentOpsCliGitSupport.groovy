package plugins.org.rd.plugin.uigoodies

import org.craftercms.studio.api.v1.constant.GitRepositories
import org.craftercms.studio.api.v2.utils.GitRepositoryHelper

import java.nio.file.Path

/**
 * External git history operations for DevContentOps Tools.
 * filter-repo cannot run inside the Studio Groovy sandbox; use the host CLI script instead.
 */
final class DevContentOpsCliGitSupport {

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
        String cliScript = 'scripts/dev-content-ops-cli/filter-file-from-history.sh'

        return [
            success: false,
            inStudio: false,
            mode: 'external',
            path: DevContentOpsSupport.jsonSafeText(normalized),
            repoPath: DevContentOpsSupport.jsonSafeText(repoPathStr),
            command: DevContentOpsSupport.jsonSafeText(suggestedCommand),
            suggestedCommand: DevContentOpsSupport.jsonSafeText(suggestedCommand),
            cliScript: DevContentOpsSupport.jsonSafeText(cliScript),
            error: DevContentOpsSupport.jsonSafeText(
                'Removing a file from git history requires git filter-repo on the Studio server.'
            ),
            hint: DevContentOpsSupport.jsonSafeText(
                'Install git-filter-repo on the Studio server, then run scripts/dev-content-ops-cli/filter-file-from-history.sh ' +
                    'or the command below. Afterward reset the processed commit to the new HEAD and sync.'
            )
        ]
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
