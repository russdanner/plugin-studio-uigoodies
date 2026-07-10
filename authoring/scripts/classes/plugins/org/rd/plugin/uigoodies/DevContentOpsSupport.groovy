package plugins.org.rd.plugin.uigoodies

import org.craftercms.studio.api.v1.constant.GitRepositories
import org.craftercms.studio.api.v2.repository.ContentRepository
import org.craftercms.studio.api.v2.utils.GitRepositoryHelper
import org.eclipse.jgit.api.Git
import org.eclipse.jgit.api.LogCommand
import org.eclipse.jgit.diff.DiffEntry
import org.eclipse.jgit.diff.DiffFormatter
import org.eclipse.jgit.diff.RawTextComparator
import org.eclipse.jgit.lib.ObjectId
import org.eclipse.jgit.lib.Ref
import org.eclipse.jgit.lib.Repository
import org.eclipse.jgit.patch.Patch
import org.eclipse.jgit.patch.PatchApplier
import org.eclipse.jgit.revwalk.RevCommit
import org.eclipse.jgit.revwalk.RevTree
import org.eclipse.jgit.revwalk.RevWalk
import org.eclipse.jgit.revwalk.filter.CommitTimeRevFilter
import org.eclipse.jgit.revwalk.filter.RevFilter
import org.eclipse.jgit.treewalk.CanonicalTreeParser
import org.eclipse.jgit.treewalk.TreeWalk
import org.slf4j.Logger
import org.slf4j.LoggerFactory

import java.io.ByteArrayInputStream
import java.io.ByteArrayOutputStream
import java.nio.charset.StandardCharsets
import java.text.SimpleDateFormat
import java.util.Date
import java.util.TimeZone

/**
 * Git helpers for DevContentOps Tools.
 */
final class DevContentOpsSupport {

    private static final Logger LOG = LoggerFactory.getLogger(DevContentOpsSupport)

    private DevContentOpsSupport() {}

    static String plainString(def value) {
        if (value == null) {
            return null
        }
        // Force a plain java.lang.String so Studio JSON encoding does not serialize GString/other types as beans.
        return new String(String.valueOf(value.toString()))
    }

    static String jsonSafeText(def value) {
        String text = plainString(value)
        if (!text) {
            return text
        }
        return text.replaceAll(/[\u0000-\u001F\u007F]/, ' ').trim()
    }

    static String jsonSafeContent(def value) {
        String text = plainString(value)
        if (text == null) {
            return null
        }
        return text.replaceAll(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/, ' ')
    }

    static long toLong(def value, long defaultValue = 0L) {
        if (value == null) {
            return defaultValue
        }
        if (value instanceof Number) {
            return (value as Number).longValue()
        }
        try {
            return Long.parseLong(String.valueOf(value).trim())
        } catch (Exception ignored) {
            return defaultValue
        }
    }

    static boolean toBoolean(def value, boolean defaultValue = false) {
        if (value == null) {
            return defaultValue
        }
        if (value instanceof Boolean) {
            return (boolean) value
        }
        String text = String.valueOf(value).trim().toLowerCase()
        if (!text) {
            return defaultValue
        }
        if (text in ['true', '1', 'yes', 'on']) {
            return true
        }
        if (text in ['false', '0', 'no', 'off']) {
            return false
        }
        return defaultValue
    }

    static boolean isLikelyBinary(byte[] bytes) {
        if (!bytes?.length) {
            return false
        }
        int limit = Math.min(bytes.length, 8192)
        for (int i = 0; i < limit; i++) {
            if (bytes[i] == 0 as byte) {
                return true
            }
        }
        return false
    }

    static Map errorMap(String message, String hint = null) {
        def out = [error: jsonSafeText(message ?: 'Request failed')]
        if (hint) {
            out.hint = jsonSafeText(hint)
        }
        return out
    }

    /**
     * Crafter plugin scripts must use the Studio session site as query {@code siteId}.
     * DevContentOps passes the selected project as {@code targetSiteId} for operations.
     */
    static String resolveOperationSiteId(String studioSiteId, Map params, Map payload = null) {
        String target = jsonSafeText(params?.targetSiteId ?: '')
        if (!target && payload) {
            target = jsonSafeText(payload?.targetSiteId ?: '')
        }
        String studio = jsonSafeText(studioSiteId ?: '')
        return target ?: studio
    }

    /**
     * Resolve the target site from the plugin request query string (required).
     * When a JSON body is present, body.siteId must match the query siteId if supplied.
     */
    static Map resolveRequestSiteId(String querySiteId, Map payload = null) {
        String siteId = jsonSafeText(querySiteId ?: '')
        if (!siteId) {
            return [error: errorMap('siteId query parameter is required')]
        }
        if (payload) {
            String bodySiteId = jsonSafeText(payload.siteId ?: '')
            if (bodySiteId && bodySiteId != siteId) {
                return [error: errorMap('siteId in request body does not match query siteId')]
            }
        }
        return [siteId: siteId]
    }

    static Map withSiteId(String siteId, Map payload) {
        Map out = payload ? new LinkedHashMap(payload) : new LinkedHashMap()
        out.siteId = jsonSafeText(siteId)
        return out
    }

    static Map failureFromThrowable(Throwable t, String context) {
        def type = t?.class?.simpleName ?: 'Error'
        def msg = jsonSafeText(t?.message) ?: type
        LOG.error('[uigoodies DevContentOps] {} — {}: {}', context, type, msg, t)
        def userMsg = msg && msg != type ? "${context}: ${msg}" : context
        return errorMap(userMsg)
    }

    static Map readJsonBody(request) {
        def reader = request.getReader()
        def text = ''
        def line
        while ((line = reader.readLine()) != null) {
            text = text ? "${text}\n${line}" : line
        }
        if (!text?.trim()) {
            return [:]
        }
        try {
            return new groovy.json.JsonSlurper().parseText(text) as Map
        } catch (Exception e) {
            return null
        }
    }

    static GitRepositoryHelper gitHelper(def applicationContext) {
        return applicationContext.get('studio.gitRepositoryHelper') as GitRepositoryHelper
    }

    static ContentRepository contentRepository(def applicationContext) {
        return applicationContext.get('contentRepository') as ContentRepository
    }

    static Object sitesService(def applicationContext) {
        return applicationContext.get('sitesService')
    }

    static Object processedCommitsDao(def applicationContext) {
        return applicationContext.get('processedCommitsDao')
    }

    static Object configurationService(def applicationContext) {
        return safeGetBean(applicationContext, 'configurationService')
    }

    static Object gitCli(def applicationContext) {
        return DevContentOpsStudioGitSupport.gitCli(applicationContext)
    }

    /**
     * applicationContext.get() throws NoSuchBeanDefinitionException when a bean is missing.
     */
    static Object safeGetBean(def applicationContext, String beanName) {
        if (!applicationContext || !beanName) {
            return null
        }
        try {
            return applicationContext.get(beanName)
        } catch (Exception e) {
            LOG.debug('[uigoodies DevContentOps] Bean not available: {} — {}', beanName, e.message)
            return null
        }
    }

    static Repository openSandboxRepo(GitRepositoryHelper helper, String siteId) {
        return helper.getRepository(siteId, GitRepositories.SANDBOX)
    }

    static String resolveBranchRef(Repository repo, String branch) {
        def b = jsonSafeText(branch)
        if (!b) {
            return 'HEAD'
        }
        if (b.startsWith('refs/')) {
            return b
        }
        return "refs/heads/${b}"
    }

    static List<String> listBranches(Repository repo) {
        def out = []
        try {
            Git git = Git.wrap(repo)
            List<Ref> refs = git.branchList().call()
            refs?.each { Ref ref ->
                def name = ref.getName()
                if (name?.startsWith('refs/heads/')) {
                    out.add(name.substring('refs/heads/'.length()))
                }
            }
        } catch (Exception e) {
            LOG.warn('Failed to list branches: {}', e.message)
        }
        if (out.isEmpty()) {
            out.add('master')
        }
        return out
    }

    static boolean isCommitProcessed(Object sitesSvc, Object processedDao, String siteId, String commitId) {
        if (!sitesSvc || !processedDao || !commitId) {
            return false
        }
        try {
            def site = sitesSvc.getSite(siteId)
            return processedDao.isProcessed(site.getId(), commitId)
        } catch (Exception ignored) {
            return false
        }
    }

    static Map commitToMap(RevCommit commit, Object sitesSvc, Object processedDao, String siteId) {
        return commitToMap(commit, sitesSvc, processedDao, siteId, null, null)
    }

    /**
     * Build a commit map. A commit is considered processed when it is recorded in the
     * short-lived processed_commits table OR it is at/before the canonical sync pointer
     * (site.last_commit_id). The processed_commits table is a transient sync helper that
     * Studio prunes, so historical commits that were long ago synced are no longer present
     * there — the canonical pointer is what determines whether a commit has been processed.
     *
     * @param lastProcessedCommitId canonical site.last_commit_id (may be null when never synced)
     * @param unprocessedCommitIds  commit ids strictly between last_commit_id and the branch head
     *                              (i.e. the commits that are genuinely not yet processed)
     */
    static Map commitToMap(
        RevCommit commit,
        Object sitesSvc,
        Object processedDao,
        String siteId,
        String lastProcessedCommitId,
        Set<String> unprocessedCommitIds
    ) {
        def id = commit.getName()
        def parents = []
        commit.getParents()?.each { RevCommit p ->
            parents.add(p.getName())
        }
        def full = commit.getFullMessage() ?: ''
        def lines = full.split('\n', 2)
        def subject = lines.length > 0 ? lines[0] : ''
        def body = lines.length > 1 ? lines[1]?.trim() : ''
        def author = commit.getAuthorIdent()
        boolean processed = isCommitProcessed(sitesSvc, processedDao, siteId, id)
        if (!processed && lastProcessedCommitId && !(unprocessedCommitIds?.contains(id))) {
            // No processed_commits row, but the commit is an ancestor of (or equal to) the
            // canonical last processed pointer, so it has already been synced/processed.
            processed = true
        }
        return [
            id: plainString(id),
            shortId: plainString(id.length() > 8 ? id.substring(0, 8) : id),
            parents: parents,
            author: jsonSafeText(author?.getName()),
            email: jsonSafeText(author?.getEmailAddress()),
            date: formatCommitDate(commit.getCommitTime()),
            subject: jsonSafeText(subject),
            body: jsonSafeText(body),
            processed: processed
        ]
    }

    /**
     * Resolve the canonical last processed commit id and the set of commit ids that are still
     * unprocessed (strictly between last_commit_id and the given branch head).
     */
    static Map resolveProcessedState(
        ContentRepository contentRepo,
        Object sitesSvc,
        String siteId,
        String branchHeadCommitId
    ) {
        String lastProcessed = null
        Set<String> unprocessed = new HashSet<>()
        if (sitesSvc) {
            try {
                lastProcessed = plainString(sitesSvc.getLastCommitId(siteId))
            } catch (Exception ignored) {
            }
        }
        if (contentRepo && lastProcessed && branchHeadCommitId && lastProcessed != branchHeadCommitId) {
            try {
                def between = contentRepo.getCommitIdsBetween(siteId, lastProcessed, branchHeadCommitId)
                between?.each { unprocessed.add(plainString(it)) }
            } catch (Exception ignored) {
            }
        }
        return [lastProcessedCommitId: lastProcessed, unprocessedCommitIds: unprocessed]
    }

    static String formatCommitDate(long seconds) {
        def sdf = new SimpleDateFormat('yyyy-MM-dd\'T\'HH:mm:ss.SSS\'Z\'')
        sdf.setTimeZone(TimeZone.getTimeZone('UTC'))
        return sdf.format(new Date(seconds * 1000L))
    }

    static CanonicalTreeParser treeParser(Repository repo, RevWalk walk, RevCommit commit) throws Exception {
        RevTree tree = walk.parseTree(commit.getTree().getId())
        CanonicalTreeParser parser = new CanonicalTreeParser()
        parser.reset(repo.newObjectReader(), tree.getId())
        return parser
    }

    static Map fetchRepoStatus(
        GitRepositoryHelper helper,
        ContentRepository contentRepo,
        String siteId,
        String branch,
        Object sitesSvc = null,
        def applicationContext = null
    ) {
        try {
            Repository repo = openSandboxRepo(helper, siteId)
            def branches = listBranches(repo)
            def branchName = jsonSafeText(branch)
            def sandboxBranch = null
            if (sitesSvc) {
                try {
                    def site = sitesSvc.getSite(siteId)
                    sandboxBranch = plainString(site?.sandboxBranch)
                    if (!branchName) {
                        branchName = jsonSafeText(site?.sandboxBranch)
                    }
                } catch (Exception ignored) {
                }
            }
            if (!branchName) {
                branchName = branches.contains('master') ? 'master' : branches[0]
            }
            def head = contentRepo.getRepoLastCommitId(siteId)
            def branchRef = resolveBranchRef(repo, branchName)
            ObjectId branchHead = repo.resolve(branchRef)
            def branchHeadId = branchHead?.name
            def unprocessed = []
            def lastProcessedCommitId = null
            if (sitesSvc && head) {
                try {
                    def lastProcessed = sitesSvc.getLastCommitId(siteId)
                    lastProcessedCommitId = plainString(lastProcessed)
                    if (lastProcessed) {
                        unprocessed = contentRepo.getCommitIdsBetween(siteId, lastProcessed, head) ?: []
                    }
                } catch (Exception ignored) {
                }
            }
            File workTree = DevContentOpsStudioGitSupport.sandboxWorkTree(helper, siteId)
            Object cli = gitCli(applicationContext)
            Map runtime = DevContentOpsStudioGitSupport.runtimeGitChecks(helper, cli, repo, workTree)
            return [
                siteId: siteId,
                branch: branchName,
                sandboxBranch: sandboxBranch,
                branches: branches,
                headCommitId: head,
                branchHeadCommitId: branchHeadId,
                lastProcessedCommitId: lastProcessedCommitId,
                unprocessedCount: unprocessed.size(),
                gitStatusOk: runtime.gitStatusOk,
                workTreeClean: runtime.workTreeClean
            ]
        } catch (Throwable t) {
            return failureFromThrowable(t, 'Failed to load repository status')
        }
    }

    static Map fetchGitLog(
        Repository repo,
        Object sitesSvc,
        Object processedDao,
        String siteId,
        String branch,
        int skip,
        int limit,
        Long sinceEpoch,
        Long untilEpoch,
        String order,
        ContentRepository contentRepo = null
    ) {
        def branchRef = resolveBranchRef(repo, branch)
        ObjectId startId = repo.resolve(branchRef)
        if (!startId) {
            return errorMap("Branch not found: ${branch}")
        }

        def processedState = resolveProcessedState(contentRepo, sitesSvc, siteId, startId.name)
        String lastProcessedCommitId = processedState.lastProcessedCommitId as String
        Set<String> unprocessedCommitIds = processedState.unprocessedCommitIds as Set<String>

        boolean ascending = jsonSafeText(order ?: 'desc').toLowerCase() == 'asc'
        List<Map> commits = []
        RevWalk walk = new RevWalk(repo)
        try {
            RevCommit start = walk.parseCommit(startId)
            walk.markStart(start)
            if (sinceEpoch != null || untilEpoch != null) {
                long since = sinceEpoch != null ? sinceEpoch : 0L
                long until = untilEpoch != null ? untilEpoch : Long.MAX_VALUE
                walk.setRevFilter(CommitTimeRevFilter.between(since, until))
            } else {
                walk.setRevFilter(RevFilter.NO_MERGES)
            }

            boolean hasMore = false
            int collected = 0

            if (ascending) {
                List<RevCommit> matched = []
                for (RevCommit commit : walk) {
                    matched.add(commit)
                }
                matched.sort { RevCommit a, RevCommit b ->
                    int byTime = Long.compare(a.getCommitTime(), b.getCommitTime())
                    if (byTime != 0) {
                        return byTime
                    }
                    return a.getName().compareTo(b.getName())
                }
                int total = matched.size()
                if (skip < total) {
                    int end = Math.min(skip + limit, total)
                    matched.subList(skip, end).each { RevCommit commit ->
                        commits.add(commitToMap(
                            commit, sitesSvc, processedDao, siteId, lastProcessedCommitId, unprocessedCommitIds
                        ))
                    }
                    collected = commits.size()
                    hasMore = skip + collected < total
                }
            } else {
                int seen = 0
                for (RevCommit commit : walk) {
                    if (seen < skip) {
                        seen++
                        continue
                    }
                    if (collected >= limit) {
                        hasMore = true
                        break
                    }
                    commits.add(commitToMap(
                        commit, sitesSvc, processedDao, siteId, lastProcessedCommitId, unprocessedCommitIds
                    ))
                    collected++
                }
            }

            return [
                siteId: jsonSafeText(siteId),
                branch: jsonSafeText(branch),
                headCommitId: start.getName(),
                lastProcessedCommitId: jsonSafeText(lastProcessedCommitId ?: ''),
                unprocessedCount: unprocessedCommitIds ? unprocessedCommitIds.size() : 0,
                commits: commits,
                skip: skip,
                limit: limit,
                hasMore: hasMore,
                nextSkip: skip + collected,
                order: ascending ? 'asc' : 'desc'
            ]
        } finally {
            walk.close()
        }
    }

    static String normalizeRepoPath(String path) {
        if (!path) {
            return path
        }
        return path.startsWith('/') ? path : '/' + path
    }

    static Map diffEntryToFileChange(DiffEntry entry) {
        def changeType = entry.getChangeType().name()
        def displayPath = entry.getChangeType() == DiffEntry.ChangeType.DELETE
            ? entry.getOldPath()
            : entry.getNewPath()
        return [
            changeType: changeType,
            path: jsonSafeText(normalizeRepoPath(displayPath)),
            oldPath: jsonSafeText(entry.getOldPath()),
            newPath: jsonSafeText(entry.getNewPath())
        ]
    }

    static List<Map> parseDiffLines(String diffText) {
        if (!diffText) {
            return []
        }
        def out = []
        diffText.split('\n').each { line ->
            if (!line) {
                return
            }
            if (line.startsWith('@@') || line.startsWith('+++') || line.startsWith('---') || line.startsWith('diff ')) {
                out.add([type: 'meta', content: jsonSafeContent(line)])
            } else if (line.startsWith('+')) {
                out.add([type: 'add', content: jsonSafeContent(line.length() > 1 ? line.substring(1) : '')])
            } else if (line.startsWith('-')) {
                out.add([type: 'remove', content: jsonSafeContent(line.length() > 1 ? line.substring(1) : '')])
            } else if (line.startsWith(' ')) {
                out.add([type: 'context', content: jsonSafeContent(line.length() > 1 ? line.substring(1) : '')])
            } else {
                out.add([type: 'meta', content: jsonSafeContent(line)])
            }
        }
        return out
    }

    static boolean pathMatchesFilter(DiffEntry entry, String pathFilter) {
        if (!pathFilter?.trim()) {
            return true
        }
        def norm = pathFilter.trim().replaceAll('^/+', '')
        def oldP = entry.getOldPath() ?: ''
        def newP = entry.getNewPath() ?: ''
        return oldP == norm || newP == norm || oldP.endsWith(norm) || newP.endsWith(norm) ||
            norm.endsWith(oldP) || norm.endsWith(newP)
    }

    static Map fetchCommitFiles(Repository repo, String commitId, int skip, int limit) {
        ObjectId oid = ObjectId.fromString(commitId)
        RevWalk walk = new RevWalk(repo)
        try {
            RevCommit commit = walk.parseCommit(oid)
            if (commit.getParentCount() == 0) {
                return [
                    commitId: commitId,
                    files: [],
                    total: 0,
                    skip: skip,
                    limit: limit,
                    hasMore: false,
                    nextSkip: 0
                ]
            }
            RevCommit parent = walk.parseCommit(commit.getParent(0))
            Git git = Git.wrap(repo)
            List<DiffEntry> entries = git.diff()
                .setOldTree(treeParser(repo, walk, parent))
                .setNewTree(treeParser(repo, walk, commit))
                .call()
            List<Map> all = []
            entries?.each { DiffEntry entry ->
                all.add(diffEntryToFileChange(entry))
            }
            int total = all.size()
            def changeCounts = [:]
            all.each { Map fileChange ->
                def t = fileChange.changeType
                changeCounts[t] = (changeCounts[t] ?: 0) + 1
            }
            int from = skip < 0 ? 0 : skip
            int to = Math.min(from + limit, total)
            def slice = from < total ? all.subList(from, to) : []
            return [
                commitId: commitId,
                files: slice,
                total: total,
                changeCounts: changeCounts,
                skip: from,
                limit: limit,
                hasMore: to < total,
                nextSkip: to
            ]
        } catch (Exception e) {
            return failureFromThrowable(e, 'Failed to list commit files')
        } finally {
            walk.close()
        }
    }

    static Map fetchCommitDetail(GitRepositoryHelper helper, Repository repo, Object sitesSvc, Object processedDao, String siteId, String commitId, ContentRepository contentRepo = null) {
        ObjectId oid = ObjectId.fromString(commitId)
        RevWalk walk = new RevWalk(repo)
        try {
            RevCommit commit = walk.parseCommit(oid)
            String branchHead = null
            if (contentRepo) {
                try {
                    branchHead = plainString(contentRepo.getRepoLastCommitId(siteId))
                } catch (Exception ignored) {
                }
            }
            def processedState = resolveProcessedState(contentRepo, sitesSvc, siteId, branchHead)
            return commitToMap(
                commit,
                sitesSvc,
                processedDao,
                siteId,
                processedState.lastProcessedCommitId as String,
                processedState.unprocessedCommitIds as Set<String>
            )
        } catch (Exception e) {
            return failureFromThrowable(e, 'Failed to load commit detail')
        } finally {
            walk.close()
        }
    }

    static String gitTreePath(String path) {
        if (!path) {
            return path
        }
        return path.startsWith('/') ? path.substring(1) : path
    }

    static boolean containsPathTraversal(String path) {
        if (!path?.trim()) {
            return false
        }
        return path.replace('\\', '/').split('/').any { segment ->
            segment == '..' || segment == '.'
        }
    }

    static Map fetchFileContent(Repository repo, String commitId, String path) {
        ObjectId oid = ObjectId.fromString(commitId)
        RevWalk walk = new RevWalk(repo)
        try {
            RevCommit commit = walk.parseCommit(oid)
            String treePath = gitTreePath(path)
            TreeWalk treeWalk = TreeWalk.forPath(repo, treePath, commit.getTree())
            if (!treeWalk) {
                return errorMap("File not found at commit: ${path}")
            }
            ObjectId blobId = treeWalk.getObjectId(0)
            byte[] bytes = repo.open(blobId).getBytes()
            if (isLikelyBinary(bytes)) {
                return [
                    path: jsonSafeText(path),
                    commitId: jsonSafeText(commitId),
                    binary: true,
                    content: '',
                    message: jsonSafeText('Binary file cannot be previewed as text')
                ]
            }
            def text = new String(bytes, StandardCharsets.UTF_8)
            return [path: jsonSafeText(path), commitId: jsonSafeText(commitId), content: jsonSafeContent(text), binary: false]
        } catch (Exception e) {
            return failureFromThrowable(e, 'Failed to read file content')
        } finally {
            walk.close()
        }
    }

    static Map fetchDiff(Repository repo, String fromRef, String toRef, String pathFilter = null) {
        RevWalk walk = new RevWalk(repo)
        try {
            ObjectId oldId = repo.resolve(fromRef)
            ObjectId newId = repo.resolve(toRef)
            if (!oldId || !newId) {
                return errorMap('Invalid from/to ref for diff')
            }
            RevCommit oldCommit = walk.parseCommit(oldId)
            RevCommit newCommit = walk.parseCommit(newId)
            Git git = Git.wrap(repo)
            List<DiffEntry> entries = git.diff()
                .setOldTree(treeParser(repo, walk, oldCommit))
                .setNewTree(treeParser(repo, walk, newCommit))
                .call()
            if (pathFilter?.trim()) {
                entries = entries?.findAll { pathMatchesFilter(it, pathFilter) } ?: []
            }
            def summary = []
            def fileDiffs = []
            def combined = new ByteArrayOutputStream()
            entries?.each { DiffEntry entry ->
                summary.add(diffEntryToFileChange(entry))
                ByteArrayOutputStream fileOut = new ByteArrayOutputStream()
                DiffFormatter formatter = new DiffFormatter(fileOut)
                formatter.setRepository(repo)
                formatter.setDiffComparator(RawTextComparator.DEFAULT)
                formatter.setDetectRenames(true)
                formatter.format(entry)
                formatter.close()
                def raw = fileOut.toString(StandardCharsets.UTF_8.name())
                if (raw) {
                    combined.write(raw.getBytes(StandardCharsets.UTF_8))
                    if (!raw.endsWith('\n')) {
                        combined.write('\n'.getBytes(StandardCharsets.UTF_8))
                    }
                }
                fileDiffs.add([
                    changeType: entry.getChangeType().name(),
                    path: jsonSafeText(
                        entry.getChangeType() == DiffEntry.ChangeType.DELETE ? entry.getOldPath() : entry.getNewPath()
                    ),
                    oldPath: jsonSafeText(entry.getOldPath()),
                    newPath: jsonSafeText(entry.getNewPath()),
                    diff: jsonSafeContent(raw),
                    lines: parseDiffLines(raw)
                ])
            }
            return [
                from: jsonSafeText(fromRef),
                to: jsonSafeText(toRef),
                path: jsonSafeText(pathFilter),
                diff: jsonSafeContent(combined.toString(StandardCharsets.UTF_8.name())),
                files: summary,
                fileDiffs: fileDiffs
            ]
        } catch (Exception e) {
            return failureFromThrowable(e, 'Failed to generate diff')
        } finally {
            walk.close()
        }
    }

    static Map buildPatchFromSelections(Repository repo, List selections) {
        if (!selections || selections.isEmpty()) {
            return errorMap('No patch selections provided')
        }
        ByteArrayOutputStream out = new ByteArrayOutputStream()
        int count = 0
        RevWalk walk = new RevWalk(repo)
        try {
            selections.each { sel ->
                def commitId = jsonSafeText(sel?.commitId ?: '')
                def path = jsonSafeText(sel?.path ?: '')
                if (!commitId) {
                    return
                }
                ObjectId oid = ObjectId.fromString(commitId)
                RevCommit commit = walk.parseCommit(oid)
                if (path) {
                    if (commit.getParentCount() == 0) {
                        return
                    }
                    RevCommit parent = walk.parseCommit(commit.getParent(0))
                    Git git = Git.wrap(repo)
                    List<DiffEntry> entries = git.diff()
                        .setOldTree(treeParser(repo, walk, parent))
                        .setNewTree(treeParser(repo, walk, commit))
                        .call()
                    entries?.each { DiffEntry entry ->
                        if (pathMatchesFilter(entry, path)) {
                            DiffFormatter formatter = new DiffFormatter(out)
                            formatter.setRepository(repo)
                            formatter.setDiffComparator(RawTextComparator.DEFAULT)
                            formatter.format(entry)
                            formatter.close()
                            count++
                        }
                    }
                } else {
                    Git git = Git.wrap(repo)
                    git.formatPatch()
                        .setOutputStream(out)
                        .setCommits([commit])
                        .call()
                    count++
                }
            }
            if (count == 0) {
                return errorMap('No patch content generated for the current selection')
            }
            return [patch: jsonSafeContent(out.toString(StandardCharsets.UTF_8.name())), selectionCount: count]
        } catch (Exception e) {
            return failureFromThrowable(e, 'Failed to build patch from selection')
        } finally {
            walk.close()
        }
    }

    static Map createFormatPatch(Repository repo, String fromCommit, String toCommit) {
        try {
            Git git = Git.wrap(repo)
            ObjectId fromId = fromCommit ? repo.resolve(fromCommit) : null
            ObjectId toId = toCommit ? repo.resolve(toCommit) : repo.resolve('HEAD')
            LogCommand log = git.log()
            if (toId) {
                log.add(toId)
            }
            if (fromId) {
                log.not(fromId)
            }
            List<RevCommit> commits = log.call()
            ByteArrayOutputStream out = new ByteArrayOutputStream()
            git.formatPatch()
                .setOutputStream(out)
                .setCommits(commits)
                .call()
            return [patch: jsonSafeContent(out.toString(StandardCharsets.UTF_8.name())), commitCount: commits.size()]
        } catch (Exception e) {
            return failureFromThrowable(e, 'Failed to create patch')
        }
    }

    static Map applyPatch(Repository repo, String patchText) {
        try {
            Patch patch = new Patch()
            patch.parse(new ByteArrayInputStream(patchText.getBytes(StandardCharsets.UTF_8)))
            if (!patch.isValid()) {
                return errorMap('Invalid patch format')
            }
            PatchApplier applier = new PatchApplier(repo)
            PatchApplier.Result result = applier.apply(patch, repo.newObjectReader())
            if (!result.isSuccessful()) {
                return errorMap('Patch apply failed', jsonSafeText(result.toString()))
            }
            return [success: true, applied: true]
        } catch (Exception e) {
            return failureFromThrowable(e, 'Failed to apply patch')
        }
    }

    static Map triggerSiteSync(def applicationContext, String siteId) {
        def event = new org.craftercms.studio.api.v2.event.site.SyncFromRepoEvent(siteId)
        def syncTask = safeGetBean(applicationContext, 'syncFromRepoTask')
        if (syncTask) {
            try {
                syncTask.syncRepoListener(event)
                return [success: true, mode: 'syncFromRepoTask']
            } catch (Exception e) {
                LOG.warn(
                    '[uigoodies DevContentOps] syncFromRepoTask failed for site {}: {}',
                    siteId,
                    e.message,
                    e
                )
                return [
                    success: false,
                    mode: 'syncFromRepoTask',
                    error: jsonSafeText(e.message ?: 'syncFromRepoTask failed')
                ]
            }
        }

        def publisher = resolveEventPublisher(applicationContext)
        if (publisher) {
            try {
                publisher.publishEvent(event)
                return [success: true, mode: 'applicationEventPublisher']
            } catch (Exception e) {
                LOG.warn(
                    '[uigoodies DevContentOps] publishEvent(SyncFromRepoEvent) failed for site {}: {}',
                    siteId,
                    e.message,
                    e
                )
                return [
                    success: false,
                    mode: 'applicationEventPublisher',
                    error: jsonSafeText(e.message ?: 'publishEvent failed')
                ]
            }
        }

        String hint = 'syncFromRepoTask bean not available in Studio scripting context'
        LOG.warn('[uigoodies DevContentOps] Repository sync not triggered for site {} — {}', siteId, hint)
        return [success: false, error: hint]
    }

    private static Object resolveEventPublisher(def applicationContext) {
        Object publisher = safeGetBean(applicationContext, 'applicationEventPublisher')
        if (publisher) {
            return publisher
        }
        Object ctx = safeGetBean(applicationContext, 'applicationContext')
        if (ctx instanceof org.springframework.context.ApplicationEventPublisher) {
            return ctx
        }
        return null
    }

    static Map setProcessedCommitAndSync(
        Object sitesSvc,
        def applicationContext,
        String siteId,
        String commitId,
        int batchSize
    ) {
        try {
            sitesSvc.updateLastCommitId(siteId, commitId)
            Map syncResult = triggerSiteSync(applicationContext, siteId)
            if (syncResult.success) {
                return [
                    success: true,
                    commitId: commitId,
                    sync: syncResult,
                    message: 'Updated last commit and triggered repository sync'
                ]
            }
            return [
                success: true,
                commitId: commitId,
                sync: syncResult,
                warning: jsonSafeText(syncResult.error ?: 'Repository sync was not triggered'),
                message: 'Updated last commit id; repository sync could not be completed automatically',
                error: jsonSafeText(syncResult.error)
            ]
        } catch (Exception e) {
            return failureFromThrowable(e, 'Failed to set processed commit')
        }
    }

    static Map revertWorkingTreeToCommit(GitRepositoryHelper helper, String siteId, Repository repo, String commitId) {
        try {
            File workTree = DevContentOpsStudioGitSupport.sandboxWorkTree(helper, siteId)
            DevContentOpsStudioGitSupport.removeIndexAndClean(helper, workTree)
            Git git = Git.wrap(repo)
            git.checkout().setName(commitId).call()
            return [success: true, mode: 'gitcli+jgit', commitId: commitId]
        } catch (Exception e) {
            return failureFromThrowable(e, 'Failed to revert working tree to commit')
        }
    }

    static Map resetHeadToCommit(Repository repo, String commitId) {
        try {
            Git git = Git.wrap(repo)
            git.reset().setMode(org.eclipse.jgit.api.ResetCommand.ResetType.HARD).setRef(commitId).call()
            return [success: true, commitId: commitId]
        } catch (Exception e) {
            return failureFromThrowable(e, 'Failed to reset HEAD')
        }
    }

    static Map runRepoGarbageCollection(GitRepositoryHelper helper, String siteId) {
        try {
            Repository repo = openSandboxRepo(helper, siteId)
            DevContentOpsStudioGitSupport.runJGitGc(repo, false)
            return [
                success: true,
                mode: 'jgit',
                warning: 'Garbage collection completed. For deep history removal use filter-repo on large blobs, then reset processed commit.'
            ]
        } catch (Exception e) {
            return failureFromThrowable(e, 'Failed to run garbage collection')
        }
    }

    static Map trimOldHistory(GitRepositoryHelper helper, String siteId, String keepCommitId) {
        Map result = runRepoGarbageCollection(helper, siteId)
        if (keepCommitId && !result.error) {
            result.keepCommitId = keepCommitId
        }
        return result
    }

    static Map filterFileFromHistory(GitRepositoryHelper helper, def applicationContext, String siteId, String filePath, Map options = [:]) {
        return DevContentOpsCliGitSupport.filterFileFromHistory(helper, applicationContext, siteId, filePath, options)
    }
}
