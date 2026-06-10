package plugins.org.rd.plugin.uigoodies

import groovy.json.JsonSlurper
import org.craftercms.studio.api.v1.to.ContentItemTO
import org.slf4j.Logger
import org.slf4j.LoggerFactory

import java.io.ByteArrayInputStream
import java.io.InputStream

/**
 * Shared cross-site copy helpers. Uses only Studio content/dependency beans and
 * sandbox-safe collections ({@link java.util.ArrayList}) plus IO APIs.
 */
final class CrossSiteContentCopySupport {

    private static final Logger LOG = LoggerFactory.getLogger(CrossSiteContentCopySupport)

    private CrossSiteContentCopySupport() {}

    /** Maximum content paths expanded from folder selections (prevents runaway BFS / timeouts). */
    static final int MAX_COLLECTED_PATHS = 10000

    static String plainPath(def value) {
        if (value == null) {
            return null
        }
        return value.toString()
    }

    /** Strip control characters that break JSON serialization in Studio REST responses. */
    static String jsonSafeText(def value) {
        def text = plainPath(value)
        if (!text) {
            return text
        }
        return text.replaceAll(/[\u0000-\u001F\u007F]/, ' ').trim()
    }

    static Map errorMap(String message, String hint = null, String detail = null) {
        def out = [error: jsonSafeText(message ?: 'Request failed')]
        if (hint) {
            out.hint = jsonSafeText(hint)
        }
        if (detail) {
            out.detail = jsonSafeText(detail)
        }
        return out
    }

    static Map failureFromThrowable(Throwable t, String context) {
        def type = t?.class?.simpleName ?: 'Error'
        def msg = jsonSafeText(t?.message) ?: type
        LOG.error('[uigoodies CrossSiteContentCopy] {} — {}: {}', context, type, msg, t)
        def userMsg = msg && msg != type ? "${context}: ${msg}" : context
        return errorMap(jsonSafeText(userMsg))
    }

    static void addUniquePath(List<String> paths, def rawPath) {
        def path = plainPath(rawPath)?.trim()
        if (path && !paths.contains(path)) {
            paths.add(path)
        }
    }

    static List<String> uniquePaths(Collection paths) {
        def out = []
        paths?.each { entry ->
            addUniquePath(out, entry)
        }
        return out
    }

    static ContentItemTO safeGetContentItem(def contentService, String site, String path) {
        if (!path?.trim()) {
            return null
        }
        try {
            return contentService.getContentItem(site, path)
        } catch (Exception e) {
            LOG.warn('Failed to load content item {} in site {}: {}', path, site, e.message)
            return null
        }
    }

    static boolean isKeepFile(def path) {
        def p = plainPath(path)
        return p != null && p.endsWith('/.keep')
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
            return new JsonSlurper().parseText(text)
        } catch (Exception e) {
            LOG.warn('Invalid JSON request body: {}', e.message)
            return null
        }
    }

    static boolean isExplicitContentFile(String path) {
        def p = plainPath(path)?.trim()
        return p && p.endsWith('.xml') && !isKeepFile(p)
    }

    /** True when the destination site sandbox is reachable via content APIs. */
    static boolean siteSandboxReachable(def contentService, String siteId) {
        if (!siteId?.trim()) {
            return false
        }
        def probes = [
            '/site/website',
            '/site/website/crafter-level-descriptor.level.xml'
        ]
        for (probe in probes) {
            try {
                if (contentService.contentExists(siteId, probe)) {
                    return true
                }
            } catch (Exception ignored) {
            }
            try {
                if (contentService.getContentItem(siteId, probe)) {
                    return true
                }
            } catch (Exception ignored) {
            }
        }
        try {
            return contentService.getContentItemTree(siteId, '/site/website', 1) != null
        } catch (Exception ignored) {
            return false
        }
    }

    static List<String> resolveSourcePaths(Map payload) {
        def paths = []
        if (payload?.sourcePaths instanceof Collection) {
            payload.sourcePaths.each { entry ->
                addUniquePath(paths, entry)
            }
        }
        addUniquePath(paths, payload?.sourcePath)
        return paths
    }

    static String normalizeFolderPath(String path) {
        if (!path) {
            return path
        }
        return path.endsWith('/') ? path.substring(0, path.length() - 1) : path
    }

    static boolean pathExists(def contentService, String siteId, String rawPath) {
        if (!rawPath?.trim()) {
            return false
        }
        def trimmed = rawPath.trim()
        def normalized = normalizeFolderPath(trimmed)
        def variants = []
        addUniquePath(variants, trimmed)
        if (normalized) {
            addUniquePath(variants, normalized)
            addUniquePath(variants, normalized + '/')
            addUniquePath(variants, normalized + '/.keep')
        }
        for (variant in variants) {
            if (variant && contentService.contentExists(siteId, variant)) {
                return true
            }
        }
        for (candidate in variants) {
            if (!candidate) {
                continue
            }
            try {
                if (contentService.getContentItemTree(siteId, candidate, -1)) {
                    return true
                }
            } catch (Exception ignored) {
            }
            try {
                if (contentService.getContentItem(siteId, candidate)) {
                    return true
                }
            } catch (Exception ignored) {
            }
        }
        return false
    }

    /** Depth passed to {@code getContentItemTree}: only direct children are returned per call. */
    private static final int TREE_CHILDREN_DEPTH = 2

    static boolean isFolderItem(ContentItemTO item) {
        if (!item) {
            return false
        }
        if (item.folder) {
            return true
        }
        def uri = plainPath(item.uri)
        return uri && !uri.contains('.')
    }

    static ContentItemTO loadTreeNode(def contentService, String site, String path) {
        def candidates = []
        def trimmed = path?.trim()
        def normalized = normalizeFolderPath(trimmed)
        addUniquePath(candidates, trimmed)
        if (normalized) {
            addUniquePath(candidates, normalized)
            addUniquePath(candidates, normalized + '/')
        }
        ContentItemTO tree = null
        candidates.each { candidate ->
            if (tree) {
                return
            }
            try {
                tree = contentService.getContentItemTree(site, candidate, TREE_CHILDREN_DEPTH)
            } catch (Exception ignored) {
            }
        }
        return tree
    }

    /**
     * Collect content paths for a selection. Returns {@code [paths: List, error: String|null]}.
     */
    static Map collectPrimaryPathsResult(def contentService, String site, String path) {
        def paths = []
        def trimmed = path?.trim()
        def normalized = normalizeFolderPath(trimmed)
        if (!normalized) {
            return [paths: paths, error: null]
        }

        if (isExplicitContentFile(trimmed)) {
            addUniquePath(paths, trimmed)
            return [paths: paths, error: null]
        }

        if (!pathExists(contentService, site, normalized)) {
            addUniquePath(paths, normalized)
            return [paths: paths, error: null]
        }

        def root = loadTreeNode(contentService, site, normalized)
        if (!root) {
            addUniquePath(paths, normalized)
            return [paths: paths, error: null]
        }

        if (!isFolderItem(root) && !(root.children?.size() > 0)) {
            addUniquePath(paths, root.uri ?: normalized)
            return [paths: paths, error: null]
        }

        def visited = []
        def queue = []
        queue.add(plainPath(root.uri ?: normalized))

        while (!queue.isEmpty()) {
            if (paths.size() >= MAX_COLLECTED_PATHS) {
                return [
                    paths: paths,
                    error: "Folder selection exceeds maximum of ${MAX_COLLECTED_PATHS} items. Select a smaller folder or fewer paths."
                ]
            }

            def current = queue.remove(0)
            if (visited.contains(current)) {
                continue
            }
            visited.add(current)
            addUniquePath(paths, current)

            ContentItemTO node
            try {
                node = loadTreeNode(contentService, site, current)
            } catch (Exception e) {
                LOG.warn('Failed to list children of {} in site {}: {}', current, site, e.message)
                continue
            }
            if (!node?.children) {
                continue
            }

            node.children.each { child ->
                def childPath = plainPath(child?.uri)
                if (!childPath || isKeepFile(childPath)) {
                    return
                }
                addUniquePath(paths, childPath)
                if (isFolderItem(child)) {
                    queue.add(normalizeFolderPath(childPath))
                }
            }
        }

        return [paths: paths, error: null]
    }

    static List<String> collectDependencyPaths(def dependencyService, String site, Collection<String> seedPaths) {
        def deps = []
        seedPaths.each { seed ->
            try {
                def itemDeps = dependencyService?.getItemSpecificDependencies(site, [seed] as List)
                itemDeps?.each { dep ->
                    if (dep) {
                        addUniquePath(deps, jsonSafeText(dep))
                    }
                }
            } catch (Exception e) {
                LOG.warn('Failed to collect dependencies for {} in site {}: {}', seed, site, e.message)
            }
        }
        return deps
    }

    static Map buildAllPathsResult(
        def contentService,
        def dependencyService,
        String sourceSiteId,
        Collection<String> sourcePaths,
        boolean copyDependencies
    ) {
        def primaryPaths = []
        for (selection in sourcePaths) {
            def collected = collectPrimaryPathsResult(contentService, sourceSiteId, selection)
            if (collected.error) {
                return [paths: primaryPaths, error: collected.error]
            }
            collected.paths?.each { entry ->
                addUniquePath(primaryPaths, entry)
            }
        }

        def dependencyPaths = copyDependencies
            ? collectDependencyPaths(dependencyService, sourceSiteId, primaryPaths)
            : []

        def allPaths = []
        primaryPaths.each { entry ->
            addUniquePath(allPaths, entry)
        }
        dependencyPaths.each { dep ->
            if (!primaryPaths.contains(dep)) {
                try {
                    if (contentService.contentExists(sourceSiteId, dep)) {
                        addUniquePath(allPaths, dep)
                    }
                } catch (Exception e) {
                    LOG.warn('Dependency path check failed for {} in site {}: {}', dep, sourceSiteId, e.message)
                }
            }
        }

        return [paths: withoutKeepFiles(allPaths), error: null]
    }

    static List<String> withoutKeepFiles(Collection paths) {
        def out = []
        paths?.each { entry ->
            def path = plainPath(entry)?.trim()
            if (path && !isKeepFile(path)) {
                addUniquePath(out, path)
            }
        }
        return out
    }

    static Map<String, String> splitPathParts(String fullPath) {
        def slash = fullPath.lastIndexOf('/')
        if (slash < 0) {
            return [parent: '/', fileName: fullPath]
        }
        return [parent: fullPath.substring(0, slash) ?: '/', fileName: fullPath.substring(slash + 1)]
    }

    static Closure<Boolean> ensureFolderExistsFactory(def contentService) {
        Closure<Boolean> ensureFolderExists
        ensureFolderExists = { String siteId, String folderPath ->
            def normalized = normalizeFolderPath(folderPath)
            if (!normalized || normalized == '/') {
                return true
            }
            if (contentService.contentExists(siteId, normalized)) {
                return true
            }
            def slash = normalized.lastIndexOf('/')
            if (slash <= 0) {
                return false
            }
            def parent = normalized.substring(0, slash) ?: '/'
            def name = normalized.substring(slash + 1)
            if (!name) {
                return false
            }
            ensureFolderExists(siteId, parent)
            try {
                return contentService.createFolder(siteId, parent, name)
            } catch (Exception e) {
                return contentService.contentExists(siteId, normalized)
            }
        }
        return ensureFolderExists
    }

    static byte[] readContentBytes(def contentService, String siteId, String path) {
        InputStream inputStream = null
        try {
            inputStream = contentService.getContent(siteId, path)
            if (!inputStream) {
                return null
            }
            return inputStream.readAllBytes()
        } finally {
            try {
                inputStream?.close()
            } catch (Exception ignored) {
            }
        }
    }

    static void writeItem(def contentService, String siteId, String path, byte[] bytes, boolean existed, String contentType) {
        def parts = splitPathParts(path)
        def stream = new ByteArrayInputStream(bytes ?: new byte[0])
        def edit = existed ? 'true' : 'false'
        def unlock = 'true'
        def createFolders = 'true'

        if (path.startsWith('/site')) {
            contentService.writeContent(
                siteId,
                parts.parent,
                parts.fileName,
                contentType ?: '',
                stream,
                createFolders,
                edit,
                unlock
            )
        } else {
            contentService.writeContentAsset(
                siteId,
                parts.parent,
                parts.fileName,
                stream,
                'false',
                '',
                '',
                'true',
                'false',
                unlock,
                null
            )
        }
    }
}
