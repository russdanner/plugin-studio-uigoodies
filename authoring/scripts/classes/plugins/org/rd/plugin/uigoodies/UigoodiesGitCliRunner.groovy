package plugins.org.rd.plugin.uigoodies

/**
 * Extends Studio {@link org.craftercms.studio.impl.v2.utils.git.GitCli} so ProcessBuilder
 * runs inside Java (outside the Groovy sandbox). Used for {@code git filter-repo} /
 * {@code git filter-branch} when removing a path from sandbox history.
 *
 * <p>{@code GitCommandLine} is a non-static inner class; its bytecode constructor is
 * {@code (GitCli, File, String)}. Groovy must pass the enclosing {@code this} explicitly.
 */
class UigoodiesGitCliRunner extends org.craftercms.studio.impl.v2.utils.git.GitCli {

    UigoodiesGitCliRunner() {
        // git binary, wait timeout secs, destroy timeout secs, max output bytes
        super('git', 3600, 120, 1_000_000)
    }

    /**
     * Runs {@code git filter-repo --path <path> --invert-paths --force} in {@code workTree}.
     */
    void filterRepoRemovePath(File workTree, String repoRelativePath) {
        GitCommandLine cmd = new GitCommandLine(this, workTree, 'filter-repo')
        cmd.addParam('--path')
        cmd.addParam(repoRelativePath)
        cmd.addParam('--invert-paths')
        cmd.addParam('--force')
        doExecuteGitCommand(cmd)
    }

    /**
     * Fallback when filter-repo is unavailable: {@code git filter-branch} index filter.
     */
    void filterBranchRemovePath(File workTree, String repoRelativePath) {
        String escaped = String.valueOf(repoRelativePath).replace("'", "'\\''")
        String indexFilter = "git rm --cached --ignore-unmatch '" + escaped + "'"
        GitCommandLine cmd = new GitCommandLine(this, workTree, 'filter-branch')
        cmd.addParam('--force')
        cmd.addParam('--index-filter')
        cmd.addParam(indexFilter)
        cmd.addParam('--prune-empty')
        cmd.addParam('--tag-name-filter')
        cmd.addParam('cat')
        cmd.addParam('--')
        cmd.addParam('--all')
        doExecuteGitCommand(cmd)
    }

    void reflogExpireAll(File workTree) {
        GitCommandLine cmd = new GitCommandLine(this, workTree, 'reflog')
        cmd.addParam('expire')
        cmd.addParam('--expire=now')
        cmd.addParam('--all')
        doExecuteGitCommand(cmd)
    }

    void gcPruneNow(File workTree) {
        GitCommandLine cmd = new GitCommandLine(this, workTree, 'gc')
        cmd.addParam('--prune=now')
        doExecuteGitCommand(cmd)
    }
}
