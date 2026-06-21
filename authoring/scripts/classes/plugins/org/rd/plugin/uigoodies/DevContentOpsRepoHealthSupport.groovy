package plugins.org.rd.plugin.uigoodies

import org.craftercms.studio.api.v1.service.GeneralLockService
import org.craftercms.studio.api.v2.utils.GitRepositoryHelper
import org.eclipse.jgit.api.Git
import org.eclipse.jgit.lib.FileMode
import org.eclipse.jgit.lib.ObjectId
import org.eclipse.jgit.lib.Ref
import org.eclipse.jgit.lib.Repository
import org.eclipse.jgit.revwalk.RevCommit
import org.eclipse.jgit.revwalk.RevObject
import org.eclipse.jgit.revwalk.RevTag
import org.eclipse.jgit.revwalk.RevTree
import org.eclipse.jgit.revwalk.RevWalk
import org.eclipse.jgit.treewalk.TreeWalk

import java.nio.file.Path

/**
 * GitSizer-inspired sandbox repository health metrics and optimization helpers.
 * Analysis uses JGit + NIO. Optimize prefers studio.gitCli / GitRepositoryHelper, then JGit GC,
 * then host CLI instructions when Studio has no API (e.g. reflog expire).
 */
final class DevContentOpsRepoHealthSupport {

    private static final String GROUP_OVERALL = 'Overall repository size'
    private static final String GROUP_BIGGEST = 'Biggest objects'
    private static final String GROUP_HISTORY = 'History structure'
    private static final String GROUP_CHECKOUT = 'Biggest checkout (HEAD)'
    private static final String GROUP_DISK = 'On-disk footprint'

    private DevContentOpsRepoHealthSupport() {}

    static Map analyzeRepoHealth(GitRepositoryHelper helper, String siteId, def applicationContext = null) {
        Repository repo = null
        try {
            if (!helper) {
                return DevContentOpsSupport.errorMap('Git services are not available in Studio')
            }
            File workTree = DevContentOpsStudioGitSupport.sandboxWorkTree(helper, siteId)
            Path workTreePath = DevContentOpsSandboxIoSupport.workTreePath(workTree.absolutePath)
            Path gitDirPath = DevContentOpsSandboxIoSupport.gitDirPath(workTreePath)
            repo = DevContentOpsSupport.openSandboxRepo(helper, siteId)
            Object cli = DevContentOpsSupport.gitCli(applicationContext)
            Map runtime = DevContentOpsStudioGitSupport.runtimeGitChecks(helper, cli, repo, workTree)
            Map repoConfig = DevContentOpsRepoConfigSupport.collectRepoConfig(repo, gitDirPath)

            Map objectStats = analyzeObjects(repo)
            Map parentStats = analyzeCommitParents(repo)
            Map historyStats = analyzeHistory(repo)
            Map checkoutStats = analyzeHeadCheckout(repo)

            int refCount = countRefs(repo)
            long gitDirBytes = DevContentOpsSandboxIoSupport.directorySize(gitDirPath)
            long looseBytes = DevContentOpsSandboxIoSupport.looseObjectBytes(gitDirPath)
            long packBytes = DevContentOpsSandboxIoSupport.packFileBytes(gitDirPath)

            List<Map> metrics = buildManualMetrics(objectStats, parentStats, historyStats, checkoutStats, refCount, gitDirBytes, looseBytes, packBytes)
            int overallConcern = maxConcern(metrics, repoConfig)
            int commits = (objectStats.commits ?: 0) as int
            long maxBlobBytes = (objectStats.maxBlobBytes ?: 0L) as long

            return [
                success: true,
                mode: 'jgit+studio',
                siteId: DevContentOpsSupport.jsonSafeText(siteId),
                repoPath: DevContentOpsSupport.jsonSafeText(workTree.absolutePath),
                overallConcern: overallConcern,
                metrics: metrics,
                repoConfig: repoConfig,
                gitRuntime: runtime,
                thresholdProfile: DevContentOpsRepoHealthThresholds.PROFILE_ID,
                thresholdProfileLabel: DevContentOpsRepoHealthThresholds.PROFILE_LABEL,
                summary: DevContentOpsSupport.jsonSafeText(buildSummary(overallConcern, gitDirBytes, maxBlobBytes, commits))
            ]
        } catch (Exception e) {
            return DevContentOpsSupport.failureFromThrowable(e, 'Failed to analyze repository health')
        } finally {
            closeQuietly(repo)
        }
    }

    static Map optimizeRepo(GitRepositoryHelper helper, def applicationContext, String siteId, String operation) {
        GeneralLockService lockService = applicationContext?.get('cstudioGeneralLockService') as GeneralLockService
        if (!helper || !lockService) {
            return DevContentOpsSupport.errorMap(
                'Git services are not available in Studio',
                'Requires studio.gitRepositoryHelper and cstudioGeneralLockService beans.'
            )
        }

        String op = DevContentOpsSupport.jsonSafeText(operation ?: 'gc')
        File workTree = DevContentOpsStudioGitSupport.sandboxWorkTree(helper, siteId)
        Object cli = DevContentOpsSupport.gitCli(applicationContext)
        String repoPath = DevContentOpsSupport.plainString(workTree.absolutePath)

        return DevContentOpsStudioGitSupport.withLockedSandbox(helper, lockService, siteId) {
            Repository repo = null
            try {
                switch (op) {
                    case 'workTreeClean':
                        if (!cli) {
                            return DevContentOpsSupport.errorMap('This maintenance operation is not available in this Studio environment')
                        }
                        DevContentOpsStudioGitSupport.cleanWorkTree(cli, workTree, true, true)
                        return DevContentOpsStudioGitSupport.optimizeResult(
                            'workTreeClean',
                            'studio',
                            'git clean -fd',
                            'Working tree cleaned'
                        )
                    case 'resetHard':
                        if (!cli) {
                            return DevContentOpsSupport.errorMap('This maintenance operation is not available in this Studio environment')
                        }
                        DevContentOpsStudioGitSupport.resetHardWorkTree(cli, workTree)
                        return DevContentOpsStudioGitSupport.optimizeResult(
                            'resetHard',
                            'studio',
                            'git reset --hard',
                            'Hard reset completed'
                        )
                    case 'gcAuto':
                        repo = DevContentOpsSupport.openSandboxRepo(helper, siteId)
                        DevContentOpsStudioGitSupport.runJGitGc(repo, false)
                        return DevContentOpsStudioGitSupport.optimizeResult(
                            'gcAuto',
                            'studio',
                            'git gc --auto',
                            'Garbage collection completed'
                        )
                    case 'gc':
                        repo = DevContentOpsSupport.openSandboxRepo(helper, siteId)
                        DevContentOpsStudioGitSupport.runJGitGc(repo, false)
                        return DevContentOpsStudioGitSupport.optimizeResult(
                            'gc',
                            'studio',
                            'git gc --prune=now',
                            'Garbage collection completed'
                        )
                    case 'gcAggressive':
                        repo = DevContentOpsSupport.openSandboxRepo(helper, siteId)
                        DevContentOpsStudioGitSupport.runJGitGc(repo, true)
                        return DevContentOpsStudioGitSupport.optimizeResult(
                            'gcAggressive',
                            'studio',
                            'git gc --aggressive --prune=now',
                            'Aggressive garbage collection completed'
                        )
                    case 'repack':
                        repo = DevContentOpsSupport.openSandboxRepo(helper, siteId)
                        DevContentOpsStudioGitSupport.runJGitGc(repo, false)
                        return DevContentOpsStudioGitSupport.optimizeResult(
                            'repack',
                            'studio',
                            'git repack -a -d',
                            'Repack completed'
                        )
                    case 'repackFromPack':
                        repo = DevContentOpsSupport.openSandboxRepo(helper, siteId)
                        DevContentOpsStudioGitSupport.runJGitGc(repo, false)
                        return DevContentOpsStudioGitSupport.optimizeResult(
                            'repackFromPack',
                            'studio',
                            'git repack -A -d',
                            'Repack completed'
                        )
                    case 'repackAggressive':
                        repo = DevContentOpsSupport.openSandboxRepo(helper, siteId)
                        DevContentOpsStudioGitSupport.runJGitGc(repo, true)
                        return DevContentOpsStudioGitSupport.optimizeResult(
                            'repackAggressive',
                            'studio',
                            'git repack -a -d -f --depth=250 --window=250',
                            'Aggressive repack completed'
                        )
                    case 'prune':
                        repo = DevContentOpsSupport.openSandboxRepo(helper, siteId)
                        DevContentOpsStudioGitSupport.runJGitGc(repo, false)
                        return DevContentOpsStudioGitSupport.optimizeResult(
                            'prune',
                            'studio',
                            'git prune --expire=now',
                            'Prune completed'
                        )
                    case 'reflogExpire':
                        return DevContentOpsStudioGitSupport.externalGitHint(
                            'reflogExpire',
                            "git -C ${repoPath} reflog expire --expire=now --all",
                            'This operation must be run on the Studio server',
                            'Run the command below on the Studio server, then return here if you want to run garbage collection.'
                        )
                    case 'fullOptimize':
                        repo = DevContentOpsSupport.openSandboxRepo(helper, siteId)
                        if (cli) {
                            DevContentOpsStudioGitSupport.cleanWorkTree(cli, workTree, true, true)
                        }
                        DevContentOpsStudioGitSupport.runJGitGc(repo, true)
                        return DevContentOpsStudioGitSupport.optimizeResult(
                            'fullOptimize',
                            'studio',
                            'git reflog expire --expire=now --all && git gc --aggressive --prune=now',
                            'Full repository optimization completed',
                            [reflogHint: "git -C ${repoPath} reflog expire --expire=now --all"]
                        )
                    default:
                        return DevContentOpsSupport.errorMap("Unknown optimize operation: ${op}")
                }
            } catch (Exception e) {
                return DevContentOpsSupport.failureFromThrowable(e, 'Repository optimization failed')
            } finally {
                closeQuietly(repo)
            }
        }
    }

    private static List<Map> buildManualMetrics(
        Map objectStats,
        Map parentStats,
        Map historyStats,
        Map checkoutStats,
        int refCount,
        long gitDirBytes,
        long looseBytes,
        long packBytes
    ) {
        List<Map> metrics = []
        int commits = (objectStats.commits ?: 0) as int
        long commitBytes = (objectStats.commitBytes ?: 0L) as long
        int trees = (objectStats.trees ?: 0) as int
        long treeBytes = (objectStats.treeBytes ?: 0L) as long
        long totalTreeEntries = (objectStats.totalTreeEntries ?: 0L) as long
        int blobs = (objectStats.blobs ?: 0) as int
        long totalBlobBytes = (objectStats.totalBlobBytes ?: 0L) as long
        int tags = (objectStats.tags ?: 0) as int
        long maxCommitBytes = (objectStats.maxCommitBytes ?: 0L) as long
        String maxCommitId = DevContentOpsSupport.plainString(objectStats.maxCommitId)
        long maxBlobBytes = (objectStats.maxBlobBytes ?: 0L) as long
        String maxBlobId = DevContentOpsSupport.plainString(objectStats.maxBlobId)
        int maxTreeEntries = (objectStats.maxTreeEntries ?: 0) as int
        String maxTreeId = DevContentOpsSupport.plainString(objectStats.maxTreeId)

        metrics << countMetric('commits', GROUP_OVERALL, 'Commits · count', commits,
            DevContentOpsRepoHealthThresholds.COMMITS_WARN, DevContentOpsRepoHealthThresholds.COMMITS_CRITICAL)
        metrics << byteMetric('commitTotalSize', GROUP_OVERALL, 'Commits · total size', commitBytes,
            DevContentOpsRepoHealthThresholds.COMMIT_BYTES_WARN, DevContentOpsRepoHealthThresholds.COMMIT_BYTES_CRITICAL)
        metrics << countMetric('trees', GROUP_OVERALL, 'Trees · count', trees,
            DevContentOpsRepoHealthThresholds.TREES_WARN, DevContentOpsRepoHealthThresholds.TREES_CRITICAL)
        metrics << byteMetric('treeTotalSize', GROUP_OVERALL, 'Trees · total size', treeBytes,
            DevContentOpsRepoHealthThresholds.TREE_BYTES_WARN, DevContentOpsRepoHealthThresholds.TREE_BYTES_CRITICAL)
        metrics << countMetric('totalTreeEntries', GROUP_OVERALL, 'Trees · total tree entries', totalTreeEntries,
            DevContentOpsRepoHealthThresholds.TREE_ENTRIES_WARN, DevContentOpsRepoHealthThresholds.TREE_ENTRIES_CRITICAL)
        metrics << countMetric('blobs', GROUP_OVERALL, 'Blobs · count', blobs,
            DevContentOpsRepoHealthThresholds.BLOBS_WARN, DevContentOpsRepoHealthThresholds.BLOBS_CRITICAL)
        metrics << byteMetric('totalBlobSize', GROUP_OVERALL, 'Blobs · total size', totalBlobBytes,
            DevContentOpsRepoHealthThresholds.BLOB_BYTES_WARN, DevContentOpsRepoHealthThresholds.BLOB_BYTES_CRITICAL)
        metrics << countMetric('tags', GROUP_OVERALL, 'Annotated tags · count', tags,
            DevContentOpsRepoHealthThresholds.TAGS_WARN, DevContentOpsRepoHealthThresholds.TAGS_CRITICAL)
        metrics << countMetric('refs', GROUP_OVERALL, 'References · count', refCount,
            DevContentOpsRepoHealthThresholds.REFS_WARN, DevContentOpsRepoHealthThresholds.REFS_CRITICAL)

        metrics << byteMetric(
            'maxCommitSize',
            GROUP_BIGGEST,
            'Commits · maximum size',
            maxCommitBytes,
            DevContentOpsRepoHealthThresholds.MAX_COMMIT_BYTES_WARN,
            DevContentOpsRepoHealthThresholds.MAX_COMMIT_BYTES_CRITICAL,
            [objectId: maxCommitId]
        )
        metrics << countMetric(
            'maxCommitParents',
            GROUP_BIGGEST,
            'Commits · maximum parents',
            (parentStats.maxParents ?: 0) as int,
            DevContentOpsRepoHealthThresholds.MAX_COMMIT_PARENTS_WARN,
            DevContentOpsRepoHealthThresholds.MAX_COMMIT_PARENTS_CRITICAL,
            [objectId: DevContentOpsSupport.plainString(parentStats.maxParentsCommitId)]
        )
        metrics << countMetric(
            'maxTreeEntries',
            GROUP_BIGGEST,
            'Trees · maximum entries',
            maxTreeEntries,
            DevContentOpsRepoHealthThresholds.MAX_TREE_ENTRIES_WARN,
            DevContentOpsRepoHealthThresholds.MAX_TREE_ENTRIES_CRITICAL,
            [objectId: maxTreeId]
        )
        metrics << byteMetric(
            'largestBlob',
            GROUP_BIGGEST,
            'Blobs · maximum size',
            maxBlobBytes,
            DevContentOpsRepoHealthThresholds.MAX_BLOB_BYTES_WARN,
            DevContentOpsRepoHealthThresholds.MAX_BLOB_BYTES_CRITICAL,
            [objectId: maxBlobId]
        )

        metrics << countMetric(
            'maxHistoryDepth',
            GROUP_HISTORY,
            'Maximum history depth',
            (historyStats.maxHistoryDepth ?: 0) as int,
            DevContentOpsRepoHealthThresholds.HISTORY_DEPTH_WARN,
            DevContentOpsRepoHealthThresholds.HISTORY_DEPTH_CRITICAL
        )
        metrics << countMetric(
            'maxTagDepth',
            GROUP_HISTORY,
            'Maximum tag depth',
            (historyStats.maxTagDepth ?: 0) as int,
            DevContentOpsRepoHealthThresholds.TAG_DEPTH_WARN,
            DevContentOpsRepoHealthThresholds.TAG_DEPTH_CRITICAL
        )

        metrics << countMetric(
            'checkoutDirectories',
            GROUP_CHECKOUT,
            'Number of directories',
            (checkoutStats.directories ?: 0) as int,
            DevContentOpsRepoHealthThresholds.CHECKOUT_DIRS_WARN,
            DevContentOpsRepoHealthThresholds.CHECKOUT_DIRS_CRITICAL
        )
        metrics << countMetric(
            'checkoutMaxPathDepth',
            GROUP_CHECKOUT,
            'Maximum path depth',
            (checkoutStats.maxPathDepth ?: 0) as int,
            DevContentOpsRepoHealthThresholds.CHECKOUT_DEPTH_WARN,
            DevContentOpsRepoHealthThresholds.CHECKOUT_DEPTH_CRITICAL
        )
        metrics << countMetric(
            'checkoutMaxPathLength',
            GROUP_CHECKOUT,
            'Maximum path length',
            (checkoutStats.maxPathLength ?: 0) as int,
            DevContentOpsRepoHealthThresholds.CHECKOUT_PATH_LEN_WARN,
            DevContentOpsRepoHealthThresholds.CHECKOUT_PATH_LEN_CRITICAL
        )
        metrics << countMetric(
            'checkoutFileCount',
            GROUP_CHECKOUT,
            'Number of files',
            (checkoutStats.fileCount ?: 0) as int,
            DevContentOpsRepoHealthThresholds.CHECKOUT_FILES_WARN,
            DevContentOpsRepoHealthThresholds.CHECKOUT_FILES_CRITICAL
        )
        metrics << byteMetric(
            'checkoutTotalFileSize',
            GROUP_CHECKOUT,
            'Total size of files',
            (checkoutStats.totalFileBytes ?: 0L) as long,
            DevContentOpsRepoHealthThresholds.CHECKOUT_BYTES_WARN,
            DevContentOpsRepoHealthThresholds.CHECKOUT_BYTES_CRITICAL
        )
        metrics << countMetric(
            'checkoutSymlinks',
            GROUP_CHECKOUT,
            'Number of symlinks',
            (checkoutStats.symlinks ?: 0) as int,
            DevContentOpsRepoHealthThresholds.CHECKOUT_SYMLINKS_WARN,
            DevContentOpsRepoHealthThresholds.CHECKOUT_SYMLINKS_CRITICAL
        )
        metrics << countMetric(
            'checkoutSubmodules',
            GROUP_CHECKOUT,
            'Number of submodules',
            (checkoutStats.submodules ?: 0) as int,
            DevContentOpsRepoHealthThresholds.CHECKOUT_SUBMODULES_WARN,
            DevContentOpsRepoHealthThresholds.CHECKOUT_SUBMODULES_CRITICAL
        )

        metrics << byteMetric('gitDirSize', GROUP_DISK, 'Repository disk size (.git)', gitDirBytes,
            DevContentOpsRepoHealthThresholds.GIT_DIR_WARN, DevContentOpsRepoHealthThresholds.GIT_DIR_CRITICAL)
        metrics << byteMetric('packSize', GROUP_DISK, 'Pack file size', packBytes,
            DevContentOpsRepoHealthThresholds.PACK_BYTES_WARN, DevContentOpsRepoHealthThresholds.PACK_BYTES_CRITICAL)
        metrics << byteMetric('looseSize', GROUP_DISK, 'Loose object size', looseBytes,
            DevContentOpsRepoHealthThresholds.LOOSE_BYTES_WARN, DevContentOpsRepoHealthThresholds.LOOSE_BYTES_CRITICAL)

        return metrics
    }

    private static Map analyzeObjects(Repository repo) {
        if (!repo) {
            return emptyObjectStats()
        }

        RevWalk revWalk = new RevWalk(repo)
        Set<ObjectId> seenCommits = new LinkedHashSet<>()
        Set<ObjectId> seenTrees = new LinkedHashSet<>()
        Set<ObjectId> seenBlobs = new LinkedHashSet<>()
        int tags = 0
        long commitBytes = 0L
        long treeBytes = 0L
        long totalBlobBytes = 0L
        long maxCommitBytes = 0L
        String maxCommitId = null
        long maxBlobBytes = 0L
        String maxBlobId = null
        long totalTreeEntries = 0L
        int maxTreeEntries = 0
        String maxTreeId = null

        try {
            markAllRefsRevWalk(revWalk, repo)

            RevCommit commit
            while ((commit = revWalk.next()) != null) {
                if (!seenCommits.add(commit.id)) {
                    continue
                }
                long commitSize = objectSize(repo, commit.id)
                commitBytes += commitSize
                if (commitSize > maxCommitBytes) {
                    maxCommitBytes = commitSize
                    maxCommitId = commit.id.name()
                }

                RevTree rootTree = revWalk.parseTree(commit.tree)
                Map treeScan = collectUniqueTrees(repo, revWalk, rootTree, seenTrees)
                treeBytes += (treeScan.treeBytes ?: 0L) as long
                totalTreeEntries += (treeScan.totalEntries ?: 0L) as long
                if (((treeScan.maxEntries ?: 0) as int) > maxTreeEntries) {
                    maxTreeEntries = treeScan.maxEntries as int
                    maxTreeId = treeScan.maxTreeId as String
                }

                TreeWalk blobWalk = new TreeWalk(repo)
                try {
                    blobWalk.addTree(rootTree)
                    blobWalk.setRecursive(true)
                    while (blobWalk.next()) {
                        FileMode mode = blobWalk.getFileMode(0)
                        if (mode == FileMode.GITLINK) {
                            continue
                        }
                        ObjectId blobId = blobWalk.getObjectId(0)
                        if (!seenBlobs.add(blobId)) {
                            continue
                        }
                        long blobSize = objectSize(repo, blobId)
                        totalBlobBytes += blobSize
                        if (blobSize > maxBlobBytes) {
                            maxBlobBytes = blobSize
                            maxBlobId = blobId.name()
                        }
                    }
                } finally {
                    blobWalk.close()
                }
            }

            repo.refDatabase.getRefsByPrefix('refs/tags/').each { Ref ref ->
                if (!ref?.objectId) {
                    return
                }
                try {
                    RevObject obj = revWalk.parseAny(ref.objectId)
                    if (obj instanceof RevTag) {
                        tags++
                    }
                } catch (Exception ignored) {
                }
            }
        } catch (Exception e) {
            org.slf4j.LoggerFactory.getLogger(DevContentOpsSupport).warn(
                '[uigoodies DevContentOps] Repository object analysis failed: {}',
                e.message,
                e
            )
            if (seenCommits.isEmpty()) {
                return emptyObjectStats()
            }
        } finally {
            revWalk.close()
        }

        return [
            commits: seenCommits.size(),
            commitBytes: commitBytes,
            maxCommitBytes: maxCommitBytes,
            maxCommitId: maxCommitId,
            trees: seenTrees.size(),
            treeBytes: treeBytes,
            totalTreeEntries: totalTreeEntries,
            blobs: seenBlobs.size(),
            totalBlobBytes: totalBlobBytes,
            maxBlobBytes: maxBlobBytes,
            maxBlobId: maxBlobId,
            tags: tags,
            maxTreeEntries: maxTreeEntries,
            maxTreeId: maxTreeId,
            treeScanCapped: false
        ]
    }

    private static Map collectUniqueTrees(
        Repository repo,
        RevWalk revWalk,
        RevTree tree,
        Set<ObjectId> seenTrees
    ) {
        long treeBytes = 0L
        long totalEntries = 0L
        int maxEntries = 0
        String maxTreeId = null
        if (!tree) {
            return [treeBytes: 0L, totalEntries: 0L, maxEntries: 0, maxTreeId: null]
        }

        List<RevTree> pending = [tree]
        while (!pending.isEmpty()) {
            RevTree current = pending.remove(0)
            if (!seenTrees.add(current.id)) {
                continue
            }
            treeBytes += objectSize(repo, current.id)

            TreeWalk tw = new TreeWalk(repo)
            try {
                tw.addTree(current)
                tw.setRecursive(false)
                int entries = 0
                while (tw.next()) {
                    entries++
                    if (tw.getFileMode(0) == FileMode.TREE) {
                        pending.add(revWalk.parseTree(tw.getObjectId(0)))
                    }
                }
                totalEntries += entries
                if (entries > maxEntries) {
                    maxEntries = entries
                    maxTreeId = current.id.name()
                }
            } finally {
                tw.close()
            }
        }

        return [
            treeBytes: treeBytes,
            totalEntries: totalEntries,
            maxEntries: maxEntries,
            maxTreeId: maxTreeId
        ]
    }

    private static long objectSize(Repository repo, ObjectId objectId) {
        if (!repo || !objectId) {
            return 0L
        }
        try {
            return repo.open(objectId).size
        } catch (Exception ignored) {
            return 0L
        }
    }

    private static Map emptyObjectStats() {
        return [
            commits: 0,
            commitBytes: 0L,
            maxCommitBytes: 0L,
            maxCommitId: null,
            trees: 0,
            treeBytes: 0L,
            totalTreeEntries: 0L,
            blobs: 0,
            totalBlobBytes: 0L,
            maxBlobBytes: 0L,
            maxBlobId: null,
            tags: 0,
            maxTreeEntries: 0,
            maxTreeId: null,
            treeScanCapped: false
        ]
    }

    private static Map analyzeCommitParents(Repository repo) {
        int maxParents = 0
        String maxParentsCommitId = null
        RevWalk walk = new RevWalk(repo)
        try {
            markAllRefsRevWalk(walk, repo)
            RevCommit commit
            while ((commit = walk.next()) != null) {
                int parents = commit.parentCount
                if (parents > maxParents) {
                    maxParents = parents
                    maxParentsCommitId = commit.name()
                }
            }
        } catch (Exception ignored) {
        } finally {
            walk.close()
        }
        return [maxParents: maxParents, maxParentsCommitId: maxParentsCommitId]
    }

    private static Map analyzeHistory(Repository repo) {
        int maxHistoryDepth = 0
        repo.refDatabase.getRefsByPrefix('refs/heads/').each { Ref ref ->
            if (!ref?.objectId) {
                return
            }
            int depth = commitDepth(repo, ref.objectId)
            if (depth > maxHistoryDepth) {
                maxHistoryDepth = depth
            }
        }
        repo.refDatabase.getRefsByPrefix('refs/tags/').each { Ref ref ->
            if (!ref?.objectId) {
                return
            }
            int depth = commitDepth(repo, ref.objectId)
            if (depth > maxHistoryDepth) {
                maxHistoryDepth = depth
            }
        }

        int maxTagDepth = analyzeMaxTagDepth(repo)
        return [maxHistoryDepth: maxHistoryDepth, maxTagDepth: maxTagDepth]
    }

    private static int analyzeMaxTagDepth(Repository repo) {
        int maxDepth = 0
        repo.refDatabase.getRefsByPrefix('refs/tags/').each { Ref ref ->
            if (!ref?.objectId) {
                return
            }
            int depth = tagChainDepth(repo, ref.objectId, 0, 32)
            if (depth > maxDepth) {
                maxDepth = depth
            }
        }
        return maxDepth
    }

    private static int tagChainDepth(Repository repo, ObjectId tagId, int depth, int maxDepth) {
        if (depth >= maxDepth || !tagId) {
            return depth
        }
        RevWalk walk = new RevWalk(repo)
        try {
            RevObject obj = walk.parseAny(tagId)
            if (!(obj instanceof RevTag)) {
                return depth
            }
            ObjectId peeled = ((RevTag) obj).object
            RevObject next = walk.parseAny(peeled)
            if (next instanceof RevTag) {
                return tagChainDepth(repo, peeled, depth + 1, maxDepth)
            }
            return depth + 1
        } catch (Exception ignored) {
            return depth
        } finally {
            walk.close()
        }
    }

    private static Map analyzeHeadCheckout(Repository repo) {
        ObjectId head = repo?.resolve('HEAD')
        if (!head) {
            return emptyCheckoutStats()
        }

        Set<String> directories = new LinkedHashSet<>()
        int maxPathDepth = 0
        int maxPathLength = 0
        int fileCount = 0
        long totalFileBytes = 0L
        int symlinks = 0
        int submodules = 0

        RevWalk revWalk = new RevWalk(repo)
        TreeWalk walk = new TreeWalk(repo)
        try {
            RevCommit commit = revWalk.parseCommit(head)
            walk.addTree(revWalk.parseTree(commit.tree))
            walk.setRecursive(true)
            while (walk.next()) {
                String path = walk.pathString
                if (!path) {
                    continue
                }
                FileMode mode = walk.getFileMode(0)
                int depth = path.split('/').length
                if (depth > maxPathDepth) {
                    maxPathDepth = depth
                }
                if (path.length() > maxPathLength) {
                    maxPathLength = path.length()
                }
                collectParentDirectories(path, directories)

                if (mode == FileMode.SYMLINK) {
                    symlinks++
                }
                if (mode == FileMode.GITLINK) {
                    submodules++
                }
                if (mode == FileMode.REGULAR_FILE || mode == FileMode.EXECUTABLE_FILE) {
                    fileCount++
                    ObjectId blobId = walk.getObjectId(0)
                    try {
                        totalFileBytes += repo.open(blobId).size
                    } catch (Exception ignored) {
                    }
                }
            }
        } catch (Exception e) {
            org.slf4j.LoggerFactory.getLogger(DevContentOpsSupport).warn(
                '[uigoodies DevContentOps] HEAD checkout analysis failed: {}',
                e.message,
                e
            )
            return emptyCheckoutStats()
        } finally {
            walk.close()
            revWalk.close()
        }

        return [
            directories: directories.size(),
            maxPathDepth: maxPathDepth,
            maxPathLength: maxPathLength,
            fileCount: fileCount,
            totalFileBytes: totalFileBytes,
            symlinks: symlinks,
            submodules: submodules
        ]
    }

    private static Map emptyCheckoutStats() {
        return [
            directories: 0,
            maxPathDepth: 0,
            maxPathLength: 0,
            fileCount: 0,
            totalFileBytes: 0L,
            symlinks: 0,
            submodules: 0
        ]
    }

    private static void markAllRefsRevWalk(RevWalk walk, Repository repo) {
        List<Ref> refs = repo.refDatabase.getRefs() ?: []
        refs.each { Ref ref ->
            if (!ref?.objectId || ref.objectId == ObjectId.zeroId) {
                return
            }
            try {
                walk.markStart(walk.parseCommit(ref.objectId))
            } catch (Exception ignored) {
            }
        }
    }

    private static int commitDepth(Repository repo, ObjectId start) {
        if (!repo || !start) {
            return 0
        }
        RevWalk walk = new RevWalk(repo)
        try {
            walk.markStart(walk.parseCommit(start))
            int count = 0
            while (walk.next()) {
                count++
            }
            return count
        } catch (Exception ignored) {
            return 0
        } finally {
            walk.close()
        }
    }

    private static int countRefs(Repository repo) {
        if (!repo) {
            return 0
        }
        try {
            return repo.refDatabase.getRefs()?.size() ?: 0
        } catch (Exception ignored) {
            return 0
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

    private static void collectParentDirectories(String path, Set<String> directories) {
        int slash = path.lastIndexOf('/')
        while (slash > 0) {
            String dir = path.substring(0, slash)
            directories.add(dir)
            slash = dir.lastIndexOf('/')
        }
    }

    private static Map countMetric(String id, String group, String label, long value, long warn, long critical, Map extra = [:]) {
        return metric(id, group, label, value, DevContentOpsRepoHealthThresholds.concernThreshold(value, warn, critical), extra)
    }

    private static Map byteMetric(String id, String group, String label, long bytes, long warn, long critical, Map extra = [:]) {
        return metric(id, group, label, DevContentOpsSupport.jsonSafeText(formatBytes(bytes)),
            DevContentOpsRepoHealthThresholds.concernThreshold(bytes, warn, critical), extra)
    }

    private static Map metric(String id, String group, String label, Object value, int concern, Map extra = [:]) {
        def row = [
            id: DevContentOpsSupport.jsonSafeText(id),
            group: DevContentOpsSupport.jsonSafeText(group),
            label: DevContentOpsSupport.jsonSafeText(label),
            value: value,
            concern: concern
        ]
        extra.each { k, v -> row[k] = v }
        return row
    }

    private static int parseIntSafe(String value) {
        if (!value?.trim()) {
            return 0
        }
        try {
            return Integer.parseInt(value.trim())
        } catch (Exception ignored) {
            return 0
        }
    }

    private static long parseLongSafe(String value) {
        if (!value?.trim()) {
            return 0L
        }
        try {
            return Long.parseLong(value.trim())
        } catch (Exception ignored) {
            return 0L
        }
    }

    private static int countNonEmptyLines(String text) {
        if (!text?.trim()) {
            return 0
        }
        int count = 0
        text.split(/\r?\n/)?.each { String line ->
            if (line?.trim()) {
                count++
            }
        }
        return count
    }

    private static int maxConcern(List<Map> metrics, Map repoConfig) {
        int max = metrics.collect { (it.concern ?: 0) as int }.max() ?: 0
        List<Map> settings = (repoConfig?.settings as List<Map>) ?: []
        settings.each { Map row ->
            int c = (row.concern ?: 0) as int
            if (c > max) {
                max = c
            }
        }
        return max
    }

    private static String buildSummary(int concern, long gitDirBytes, long maxBlobBytes, int commits) {
        if (concern >= 30) {
            return 'Critical: content sandbox metrics are very high for typical CMS usage. Consider history trim, large-asset review, or GC/repack.'
        }
        if (concern >= 3) {
            return 'Elevated: some metrics may slow Studio git operations. Review largest assets, loose objects, and run optimization if needed.'
        }
        if (commits > 0) {
            return "Healthy (content thresholds): ${commits} commits, ${formatBytes(gitDirBytes)} on disk, largest blob ${formatBytes(maxBlobBytes)}."
        }
        return "Healthy (content thresholds): ${formatBytes(gitDirBytes)} on disk."
    }

    private static String formatBytes(long bytes) {
        if (bytes < 1024) {
            return "${bytes} B"
        }
        if (bytes < 1024 * 1024) {
            return String.format('%.1f KB', bytes / 1024.0)
        }
        if (bytes < 1024 * 1024 * 1024) {
            return String.format('%.1f MB', bytes / (1024.0 * 1024.0))
        }
        return String.format('%.2f GB', bytes / (1024.0 * 1024.0 * 1024.0))
    }
}
