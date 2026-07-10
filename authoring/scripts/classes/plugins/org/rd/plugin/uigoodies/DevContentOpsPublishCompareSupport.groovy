package plugins.org.rd.plugin.uigoodies

import org.craftercms.studio.api.v1.constant.GitRepositories
import org.craftercms.studio.api.v2.repository.ContentRepository
import org.craftercms.studio.api.v2.utils.GitRepositoryHelper
import org.eclipse.jgit.diff.DiffFormatter
import org.eclipse.jgit.diff.EditList
import org.eclipse.jgit.diff.HistogramDiff
import org.eclipse.jgit.diff.RawText
import org.eclipse.jgit.diff.RawTextComparator
import org.eclipse.jgit.lib.ObjectId
import org.eclipse.jgit.lib.Repository
import org.eclipse.jgit.revwalk.RevCommit
import org.eclipse.jgit.revwalk.RevWalk
import org.eclipse.jgit.treewalk.TreeWalk
import org.slf4j.Logger
import org.slf4j.LoggerFactory

/**
 * Compare sandbox repository content against the published repository (staging or live branch).
 */
final class DevContentOpsPublishCompareSupport {

    private static final Logger LOG = LoggerFactory.getLogger(DevContentOpsPublishCompareSupport)
    private static final String SITE_CONFIG_PATH = '/config/engine/site-config.xml'
    private static final String DEFAULT_STAGING_BRANCH = 'staging'
    private static final String DEFAULT_LIVE_BRANCH = 'live'

    private static final int INTERNAL_NAME_SCAN_BYTES = 8192
    private static final Set<String> BINARY_EXTENSIONS = [
        'png', 'jpg', 'jpeg', 'gif', 'webp', 'ico', 'svg', 'pdf', 'zip', 'jar', 'war',
        'woff', 'woff2', 'ttf', 'eot', 'mp4', 'mp3', 'mov', 'avi', 'bin'
    ] as Set

    private DevContentOpsPublishCompareSupport() {}

    static Map fetchOverview(
        GitRepositoryHelper helper,
        ContentRepository contentRepo,
        def applicationContext,
        Object sitesSvc,
        String siteId
    ) {
        try {
            Map env = readPublishingEnvironmentConfig(contentRepo, siteId)
            boolean publishedExists = publishedRepositoryExists(contentRepo, siteId)
            String sandboxBranch = resolveSandboxBranch(sitesSvc, siteId)
            String stagingTarget = env.stagingTarget as String
            String liveTarget = env.liveTarget as String
            boolean stagingEnabled = env.stagingEnabled as boolean

            String autoTarget = resolveAutoPublishTarget(
                helper, contentRepo, siteId, stagingEnabled, stagingTarget, liveTarget
            )

            String sandboxHead = null
            String publishHead = null
            if (helper) {
                try {
                    Repository sandboxRepo = DevContentOpsSupport.openSandboxRepo(helper, siteId)
                    sandboxHead = resolveBranchHead(sandboxRepo, sandboxBranch)
                } catch (Exception e) {
                    LOG.debug('[uigoodies DevContentOps] sandbox head lookup failed: {}', e.message)
                }
            }
            if (publishedExists && autoTarget) {
                publishHead = resolvePublishedBranchHead(helper, contentRepo, siteId, autoTarget)
            }

            return [
                success: true,
                siteId: siteId,
                publishedRepositoryExists: publishedExists,
                stagingEnabled: stagingEnabled,
                stagingTarget: stagingTarget,
                liveTarget: liveTarget,
                defaultTarget: autoTarget,
                targets: buildTargetRows(helper, contentRepo, siteId, stagingEnabled, stagingTarget, liveTarget),
                sandboxBranch: sandboxBranch,
                sandboxHeadCommitId: sandboxHead,
                publishHeadCommitId: publishHead
            ]
        } catch (Throwable t) {
            return DevContentOpsSupport.failureFromThrowable(t, 'Failed to load publish compare overview')
        }
    }

    static Map compare(
        GitRepositoryHelper helper,
        ContentRepository contentRepo,
        Object sitesSvc,
        String siteId,
        Map opts = [:]
    ) {
        try {
            if (!helper || !contentRepo) {
                return DevContentOpsSupport.errorMap('Git services are not available')
            }
            if (!publishedRepositoryExists(contentRepo, siteId)) {
                return DevContentOpsSupport.errorMap('Published repository does not exist for this site')
            }

            Map env = readPublishingEnvironmentConfig(contentRepo, siteId)
            boolean stagingEnabled = env.stagingEnabled as boolean
            String stagingTarget = env.stagingTarget as String
            String liveTarget = env.liveTarget as String
            String requested = DevContentOpsSupport.jsonSafeText(opts.target ?: '')
            String publishTarget = resolvePublishTarget(
                helper, contentRepo, siteId, stagingEnabled, stagingTarget, liveTarget, requested
            )
            if (!publishTarget) {
                return DevContentOpsSupport.errorMap('No published branch is available to compare')
            }
            if (!contentRepo.commitIdExists(siteId, GitRepositories.PUBLISHED, publishTarget)) {
                return DevContentOpsSupport.errorMap(
                    "Published branch \"${publishTarget}\" does not exist yet. Publish content first."
                )
            }

            String sandboxBranch = resolveSandboxBranch(sitesSvc, siteId)
            Repository sandboxRepo = DevContentOpsSupport.openSandboxRepo(helper, siteId)
            Repository publishedRepo = helper.getRepository(siteId, GitRepositories.PUBLISHED)
            if (!publishedRepo) {
                return DevContentOpsSupport.errorMap('Failed to open published repository')
            }

            ObjectId sandboxCommitId = resolveBranchCommitId(sandboxRepo, sandboxBranch)
            ObjectId publishCommitId = resolveBranchCommitId(publishedRepo, publishTarget)
            if (!sandboxCommitId) {
                return DevContentOpsSupport.errorMap("Sandbox branch \"${sandboxBranch}\" could not be resolved")
            }
            if (!publishCommitId) {
                return DevContentOpsSupport.errorMap("Published branch \"${publishTarget}\" could not be resolved")
            }

            String pathPrefix = normalizePathPrefix(DevContentOpsSupport.jsonSafeText(opts.pathPrefix ?: ''))
            int skip = DevContentOpsSupport.toLong(opts.skip, 0L) as int
            int limit = DevContentOpsSupport.toLong(opts.limit, 50L) as int
            if (limit < 1) {
                limit = 50
            }
            if (limit > 200) {
                limit = 200
            }
            if (skip < 0) {
                skip = 0
            }
            boolean hideNoDiff = DevContentOpsSupport.toBoolean(opts.hideNoDiff, true)
            String query = DevContentOpsSupport.jsonSafeText(opts.query ?: '')?.toLowerCase()

            Map<String, String> sandboxPaths = listTreeObjectIds(sandboxRepo, sandboxCommitId, pathPrefix)
            Map<String, String> publishedPaths = listTreeObjectIds(publishedRepo, publishCommitId, pathPrefix)

            List<Map> changes = buildChangeList(
                sandboxPaths,
                publishedPaths,
                query,
                sandboxRepo,
                publishedRepo
            )

            Map changeCounts = [:]
            changes.each { Map row ->
                String type = row.changeType
                changeCounts[type] = (changeCounts[type] ?: 0) + 1
            }

            int total = changes.size()
            int from = Math.min(skip, total)
            int to = Math.min(from + limit, total)
            List<Map> slice = from < total ? new ArrayList<>(changes.subList(from, to)) : []
            enrichChangeRows(slice, sandboxRepo, publishedRepo)

            return [
                success: true,
                siteId: siteId,
                sandboxBranch: sandboxBranch,
                sandboxHeadCommitId: sandboxCommitId.name,
                publishTarget: publishTarget,
                publishHeadCommitId: publishCommitId.name,
                pathPrefix: pathPrefix ? DevContentOpsSupport.normalizeRepoPath(pathPrefix) : '',
                hideNoDiff: hideNoDiff,
                query: DevContentOpsSupport.jsonSafeText(opts.query ?: ''),
                files: slice,
                total: total,
                changeCounts: changeCounts,
                skip: from,
                limit: limit,
                hasMore: to < total,
                nextSkip: to
            ]
        } catch (Throwable t) {
            return DevContentOpsSupport.failureFromThrowable(t, 'Failed to compare sandbox with published repository')
        }
    }

    static Map fetchFileDiff(
        GitRepositoryHelper helper,
        ContentRepository contentRepo,
        Object sitesSvc,
        String siteId,
        String path,
        String requestedTarget = null
    ) {
        try {
            if (!path?.trim()) {
                return DevContentOpsSupport.errorMap('path is required')
            }
            if (DevContentOpsSupport.containsPathTraversal(path)) {
                return DevContentOpsSupport.errorMap('Invalid path')
            }
            if (!publishedRepositoryExists(contentRepo, siteId)) {
                return DevContentOpsSupport.errorMap('Published repository does not exist for this site')
            }

            Map env = readPublishingEnvironmentConfig(contentRepo, siteId)
            String publishTarget = resolvePublishTarget(
                helper,
                contentRepo,
                siteId,
                env.stagingEnabled as boolean,
                env.stagingTarget as String,
                env.liveTarget as String,
                DevContentOpsSupport.jsonSafeText(requestedTarget ?: '')
            )
            if (!publishTarget || !contentRepo.commitIdExists(siteId, GitRepositories.PUBLISHED, publishTarget)) {
                return DevContentOpsSupport.errorMap('Published branch is not available')
            }

            String sandboxBranch = resolveSandboxBranch(sitesSvc, siteId)
            String gitPath = DevContentOpsSupport.gitTreePath(path)
            Repository sandboxRepo = DevContentOpsSupport.openSandboxRepo(helper, siteId)
            Repository publishedRepo = helper.getRepository(siteId, GitRepositories.PUBLISHED)

            ObjectId sandboxCommitId = resolveBranchCommitId(sandboxRepo, sandboxBranch)
            ObjectId publishCommitId = resolveBranchCommitId(publishedRepo, publishTarget)
            byte[] sandboxBytes = readBlobBytes(sandboxRepo, sandboxCommitId, gitPath)
            byte[] publishedBytes = readBlobBytes(publishedRepo, publishCommitId, gitPath)

            String changeType
            if (sandboxBytes == null && publishedBytes != null) {
                changeType = 'DELETE'
            } else if (sandboxBytes != null && publishedBytes == null) {
                changeType = 'ADD'
            } else if (sandboxBytes != null && publishedBytes != null) {
                changeType = 'MODIFY'
            } else {
                return DevContentOpsSupport.errorMap('File not found in sandbox or published repository')
            }

            if (DevContentOpsSupport.isLikelyBinary(sandboxBytes ?: publishedBytes)) {
                return [
                    success: true,
                    siteId: siteId,
                    path: DevContentOpsSupport.normalizeRepoPath(gitPath),
                    changeType: changeType,
                    publishTarget: publishTarget,
                    sandboxBranch: sandboxBranch,
                    binary: true,
                    diff: '',
                    lines: [],
                    message: DevContentOpsSupport.jsonSafeText('Binary file cannot be diffed as text')
                ]
            }

            byte[] oldBytes = publishedBytes ?: new byte[0]
            byte[] newBytes = sandboxBytes ?: new byte[0]
            String raw = buildTextDiff(sandboxRepo, gitPath, oldBytes, newBytes)
            return [
                success: true,
                siteId: siteId,
                path: DevContentOpsSupport.normalizeRepoPath(gitPath),
                changeType: changeType,
                publishTarget: publishTarget,
                sandboxBranch: sandboxBranch,
                from: "published:${publishTarget}",
                to: "sandbox:${sandboxBranch}",
                binary: false,
                diff: DevContentOpsSupport.jsonSafeContent(raw),
                lines: DevContentOpsSupport.parseDiffLines(raw),
                fileDiffs: [[
                    changeType: changeType,
                    path: DevContentOpsSupport.normalizeRepoPath(gitPath),
                    diff: DevContentOpsSupport.jsonSafeContent(raw),
                    lines: DevContentOpsSupport.parseDiffLines(raw)
                ]]
            ]
        } catch (Throwable t) {
            return DevContentOpsSupport.failureFromThrowable(t, 'Failed to diff file against published repository')
        }
    }

    private static List<Map> buildChangeList(
        Map<String, String> sandboxPaths,
        Map<String, String> publishedPaths,
        String query,
        Repository sandboxRepo,
        Repository publishedRepo
    ) {
        Set<String> allPaths = new TreeSet<>()
        allPaths.addAll(sandboxPaths.keySet())
        allPaths.addAll(publishedPaths.keySet())

        List<Map> changes = []
        allPaths.each { String gitPath ->
            if (isIgnoredComparePath(gitPath)) {
                return
            }
            String sandboxOid = sandboxPaths[gitPath]
            String publishedOid = publishedPaths[gitPath]
            String changeType = null
            if (!sandboxOid && publishedOid) {
                changeType = 'DELETE'
            } else if (sandboxOid && !publishedOid) {
                changeType = 'ADD'
            } else if (sandboxOid && publishedOid && sandboxOid != publishedOid) {
                changeType = 'MODIFY'
            }
            if (!changeType) {
                return
            }

            Map row = fileChange(
                changeType,
                gitPath,
                '',
                !isLikelyBinaryPath(gitPath)
            )
            row._gitPath = gitPath
            row._sandboxOid = sandboxOid
            row._publishedOid = publishedOid

            if (!matchesQuery(row, query, sandboxRepo, publishedRepo)) {
                return
            }
            changes << row
        }
        return changes
    }

    private static void enrichChangeRows(
        List<Map> rows,
        Repository sandboxRepo,
        Repository publishedRepo
    ) {
        rows?.each { Map row ->
            String gitPath = row.remove('_gitPath') as String
            String sandboxOid = row.remove('_sandboxOid') as String
            String publishedOid = row.remove('_publishedOid') as String
            if (!gitPath || !isXmlPath(gitPath)) {
                return
            }
            String changeType = row.changeType as String
            Repository repo = changeType == 'DELETE' ? publishedRepo : sandboxRepo
            ObjectId blobId = resolveBlobId(changeType, sandboxOid, publishedOid)
            if (!repo || !blobId) {
                return
            }
            byte[] bytes = readBlobBytes(repo, blobId, INTERNAL_NAME_SCAN_BYTES)
            row.internalName = DevContentOpsSupport.jsonSafeText(extractInternalName(bytes) ?: '')
        }
    }

    private static ObjectId resolveBlobId(String changeType, String sandboxOid, String publishedOid) {
        String oid = changeType == 'DELETE' ? publishedOid : sandboxOid
        if (!oid) {
            oid = sandboxOid ?: publishedOid
        }
        try {
            return oid ? ObjectId.fromString(oid) : null
        } catch (Exception ignored) {
            return null
        }
    }

    private static Map fileChange(String changeType, String gitPath, String internalName = '', boolean hasTextDiff = true) {
        return [
            changeType: changeType,
            path: DevContentOpsSupport.normalizeRepoPath(gitPath),
            internalName: DevContentOpsSupport.jsonSafeText(internalName ?: ''),
            hasTextDiff: hasTextDiff
        ]
    }

    private static boolean isIgnoredComparePath(String gitPath) {
        if (!gitPath?.trim()) {
            return true
        }
        int slash = gitPath.lastIndexOf('/')
        String fileName = slash >= 0 ? gitPath.substring(slash + 1) : gitPath
        return fileName == '.keep'
    }

    private static boolean isXmlPath(String gitPath) {
        return gitPath?.toLowerCase()?.endsWith('.xml')
    }

    private static boolean isLikelyBinaryPath(String gitPath) {
        if (!gitPath?.contains('.')) {
            return false
        }
        String ext = gitPath.substring(gitPath.lastIndexOf('.') + 1).toLowerCase()
        return BINARY_EXTENSIONS.contains(ext)
    }

    private static boolean matchesQuery(
        Map row,
        String query,
        Repository sandboxRepo,
        Repository publishedRepo
    ) {
        if (!query) {
            return true
        }
        String path = DevContentOpsSupport.jsonSafeText(row.path ?: '')?.toLowerCase()
        if (path?.contains(query)) {
            return true
        }
        String gitPath = row._gitPath as String
        if (!isXmlPath(gitPath)) {
            return false
        }
        String changeType = row.changeType as String
        Repository repo = changeType == 'DELETE' ? publishedRepo : sandboxRepo
        ObjectId blobId = resolveBlobId(changeType, row._sandboxOid as String, row._publishedOid as String)
        if (!repo || !blobId) {
            return false
        }
        byte[] bytes = readBlobBytes(repo, blobId, INTERNAL_NAME_SCAN_BYTES)
        String internalName = DevContentOpsSupport.jsonSafeText(extractInternalName(bytes) ?: '')?.toLowerCase()
        return internalName?.contains(query)
    }

    private static String extractInternalName(byte[] bytes) {
        if (!bytes || DevContentOpsSupport.isLikelyBinary(bytes)) {
            return ''
        }
        try {
            String xml = decodeUtf8(bytes)
            if (!xml?.contains('<internal-name')) {
                return ''
            }
            return xmlTagText(xml, 'internal-name')
        } catch (Exception ignored) {
            return ''
        }
    }

    private static String decodeUtf8(byte[] bytes) {
        return new String(bytes ?: new byte[0], 'UTF-8')
    }

    private static String buildTextDiff(Repository repo, String gitPath, byte[] oldBytes, byte[] newBytes) {
        RawText oldText = new RawText(oldBytes ?: new byte[0])
        RawText newText = new RawText(newBytes ?: new byte[0])
        EditList edits = new HistogramDiff().diff(RawTextComparator.DEFAULT, oldText, newText)
        ByteArrayOutputStream out = new ByteArrayOutputStream()
        DiffFormatter formatter = new DiffFormatter(out)
        try {
            formatter.setRepository(repo)
            formatter.setDiffComparator(RawTextComparator.DEFAULT)
            formatter.format(edits, oldText, newText)
            String header = "--- published/${gitPath}\n+++ sandbox/${gitPath}\n"
            return header + out.toString('UTF-8')
        } finally {
            formatter.close()
        }
    }

    private static byte[] readBlobBytes(Repository repo, ObjectId blobId, int maxBytes = 0) {
        if (!repo || !blobId) {
            return null
        }
        try {
            def loader = repo.open(blobId)
            long size = loader.size
            if (maxBytes > 0 && size > maxBytes) {
                byte[] buf = new byte[maxBytes]
                loader.openStream().withCloseable { InputStream ins ->
                    int offset = 0
                    while (offset < maxBytes) {
                        int read = ins.read(buf, offset, maxBytes - offset)
                        if (read < 0) {
                            break
                        }
                        offset += read
                    }
                    return offset > 0 ? buf : new byte[0]
                }
            }
            return loader.bytes
        } catch (Exception e) {
            return null
        }
    }

    private static byte[] readBlobBytes(Repository repo, ObjectId commitId, String gitPath) {
        if (!repo || !commitId || !gitPath) {
            return null
        }
        RevWalk walk = new RevWalk(repo)
        try {
            RevCommit commit = walk.parseCommit(commitId)
            TreeWalk treeWalk = TreeWalk.forPath(repo, gitPath, commit.getTree())
            if (!treeWalk) {
                return null
            }
            return readBlobBytes(repo, treeWalk.getObjectId(0))
        } catch (Exception e) {
            return null
        } finally {
            walk.close()
        }
    }

    private static Map<String, String> listTreeObjectIds(Repository repo, ObjectId commitId, String pathPrefix) {
        Map<String, String> out = [:]
        if (!repo || !commitId) {
            return out
        }
        RevWalk revWalk = new RevWalk(repo)
        TreeWalk walk = null
        try {
            RevCommit commit = revWalk.parseCommit(commitId)
            walk = new TreeWalk(repo)
            walk.addTree(commit.tree)
            walk.setRecursive(true)
            while (walk.next()) {
                String gitPath = walk.pathString
                if (!pathUnderPrefix(gitPath, pathPrefix) || isIgnoredComparePath(gitPath)) {
                    continue
                }
                out[gitPath] = walk.getObjectId(0).name
            }
        } finally {
            try {
                walk?.close()
            } catch (Exception ignored) {
            }
            try {
                revWalk.close()
            } catch (Exception ignored) {
            }
        }
        return out
    }

    private static boolean pathUnderPrefix(String gitPath, String pathPrefix) {
        if (!pathPrefix) {
            return true
        }
        return gitPath == pathPrefix || gitPath.startsWith(pathPrefix + '/')
    }

    private static String normalizePathPrefix(String prefix) {
        if (!prefix?.trim()) {
            return ''
        }
        return prefix.trim().replaceAll('^/+', '').replaceAll('/+$', '')
    }

    private static List<Map> buildTargetRows(
        GitRepositoryHelper helper,
        ContentRepository contentRepo,
        String siteId,
        boolean stagingEnabled,
        String stagingTarget,
        String liveTarget
    ) {
        List<Map> rows = []
        if (stagingEnabled) {
            rows << targetRow('staging', stagingTarget, branchExists(helper, contentRepo, siteId, stagingTarget))
        }
        rows << targetRow('live', liveTarget, branchExists(helper, contentRepo, siteId, liveTarget))
        return rows
    }

    private static Map targetRow(String id, String branch, boolean exists) {
        return [
            id: id,
            branch: DevContentOpsSupport.jsonSafeText(branch),
            exists: exists
        ]
    }

    private static String resolveAutoPublishTarget(
        GitRepositoryHelper helper,
        ContentRepository contentRepo,
        String siteId,
        boolean stagingEnabled,
        String stagingTarget,
        String liveTarget
    ) {
        return resolvePublishTarget(helper, contentRepo, siteId, stagingEnabled, stagingTarget, liveTarget, '')
    }

    private static String resolvePublishTarget(
        GitRepositoryHelper helper,
        ContentRepository contentRepo,
        String siteId,
        boolean stagingEnabled,
        String stagingTarget,
        String liveTarget,
        String requested
    ) {
        String req = DevContentOpsSupport.jsonSafeText(requested)?.toLowerCase()
        if (req == 'live') {
            return liveTarget
        }
        if (req == 'staging') {
            return stagingTarget
        }
        if (stagingEnabled && branchExists(helper, contentRepo, siteId, stagingTarget)) {
            return stagingTarget
        }
        return liveTarget
    }

    private static boolean branchExists(GitRepositoryHelper helper, ContentRepository contentRepo, String siteId, String branch) {
        if (!contentRepo || !branch) {
            return false
        }
        try {
            return contentRepo.commitIdExists(siteId, GitRepositories.PUBLISHED, branch)
        } catch (Exception e) {
            return false
        }
    }

    private static String resolveSandboxBranch(Object sitesSvc, String siteId) {
        if (sitesSvc) {
            try {
                def site = sitesSvc.getSite(siteId)
                String branch = DevContentOpsSupport.jsonSafeText(site?.sandboxBranch)
                if (branch) {
                    return branch
                }
            } catch (Exception ignored) {
            }
        }
        return 'master'
    }

    private static String resolveBranchHead(Repository repo, String branch) {
        ObjectId commitId = resolveBranchCommitId(repo, branch)
        return commitId?.name
    }

    private static String resolvePublishedBranchHead(
        GitRepositoryHelper helper,
        ContentRepository contentRepo,
        String siteId,
        String branch
    ) {
        if (!branchExists(helper, contentRepo, siteId, branch)) {
            return null
        }
        try {
            Repository publishedRepo = helper.getRepository(siteId, GitRepositories.PUBLISHED)
            return resolveBranchHead(publishedRepo, branch)
        } catch (Exception e) {
            return null
        }
    }

    private static ObjectId resolveBranchCommitId(Repository repo, String branch) {
        if (!repo) {
            return null
        }
        try {
            String ref = DevContentOpsSupport.resolveBranchRef(repo, branch)
            return repo.resolve(ref)
        } catch (Exception e) {
            return null
        }
    }

    private static boolean publishedRepositoryExists(ContentRepository contentRepo, String siteId) {
        try {
            return contentRepo?.publishedRepositoryExists(siteId)
        } catch (Exception e) {
            return false
        }
    }

    private static Map readPublishingEnvironmentConfig(ContentRepository contentRepo, String siteId) {
        Map defaults = [
            stagingEnabled: false,
            stagingTarget: DEFAULT_STAGING_BRANCH,
            liveTarget: DEFAULT_LIVE_BRANCH
        ]
        if (!contentRepo) {
            return defaults
        }
        try {
            if (!contentRepo.contentExists(siteId, SITE_CONFIG_PATH)) {
                return defaults
            }
        } catch (Throwable t) {
            LOG.debug('[uigoodies DevContentOps] site-config lookup failed for {}: {}', siteId, t.message)
            return defaults
        }
        try {
            InputStream stream = contentRepo.getContent(siteId, SITE_CONFIG_PATH)
            String xml = ''
            if (stream) {
                try {
                    xml = new String(stream.readAllBytes(), 'UTF-8')
                } finally {
                    try {
                        stream.close()
                    } catch (Exception ignored) {
                    }
                }
            }
            String publishedRepoBlock = xmlBlock(xml, 'published-repository')
            if (!publishedRepoBlock) {
                return defaults
            }
            boolean stagingEnabled = xmlTagText(publishedRepoBlock, 'enable-staging-environment') == 'true'
            String stagingTarget = xmlTagText(publishedRepoBlock, 'staging-environment') ?: DEFAULT_STAGING_BRANCH
            String liveTarget = xmlTagText(publishedRepoBlock, 'live-environment') ?: DEFAULT_LIVE_BRANCH
            return [
                stagingEnabled: stagingEnabled,
                stagingTarget: DevContentOpsSupport.jsonSafeText(stagingTarget),
                liveTarget: DevContentOpsSupport.jsonSafeText(liveTarget)
            ]
        } catch (Exception e) {
            LOG.debug('[uigoodies DevContentOps] Failed to read site-config publishing settings: {}', e.message)
            return defaults
        }
    }

    private static String xmlBlock(String xml, String tag) {
        if (!xml || !tag) {
            return ''
        }
        def matcher = (xml =~ /(?s)<${tag}>(.*?)<\/${tag}>/)
        return matcher.find() ? (matcher.group(1) as String) : ''
    }

    private static String xmlTagText(String xml, String tag) {
        if (!xml || !tag) {
            return ''
        }
        def matcher = (xml =~ /<${tag}>([\s\S]*?)<\/${tag}>/)
        return matcher.find() ? DevContentOpsSupport.jsonSafeText((matcher.group(1) as String)?.trim()) : ''
    }
}
