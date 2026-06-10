package plugins.org.rd.plugin.uigoodies

import groovy.json.JsonSlurper
import org.craftercms.studio.api.v1.to.ContentItemTO
import org.slf4j.Logger
import org.slf4j.LoggerFactory

import java.io.ByteArrayInputStream
import java.io.InputStream

/**
 * Shared cross-site copy helpers. Uses only Studio content/dependency beans and
 * sandbox-safe IO ({@link ByteArrayInputStream}, {@link InputStream#readAllBytes()}).
 */
final class CrossSiteContentCopySupport {

    private static final Logger LOG = LoggerFactory.getLogger(CrossSiteContentCopySupport)

    private CrossSiteContentCopySupport() {}

    /**
     * Crafter JSON marshaling turns Groovy GStrings into objects ({@code values}, {@code strings},
     * {@code bytes}, …) instead of plain strings. Always coerce paths before returning them in REST maps.
     */
    static String plainPath(def value) {
        if (value == null) {
            return null
        }
        return value.toString()
    }

    static boolean isKeepFile(def path) {
        def p = plainPath(path)
        return p != null && p.endsWith('/.keep')
    }

    static LinkedHashSet<String> plainPathSet(Collection paths) {
        def out = new LinkedHashSet<String>()
        paths?.each { entry ->
            def path = plainPath(entry)?.trim()
            if (path) {
                out.add(path)
            }
        }
        return out
    }

    static Map readJsonBody(request) {
        def reader = request.getReader()
        def body = reader.getText()
        if (!body?.trim()) {
            return [:]
        }
        try {
            return new JsonSlurper().parseText(body)
        } catch (Exception e) {
            return null
        }
    }

    static List<String> resolveSourcePaths(Map payload) {
        def paths = new LinkedHashSet<String>()
        if (payload?.sourcePaths instanceof Collection) {
            payload.sourcePaths.each { entry ->
                def normalized = entry?.toString()?.trim()
                if (normalized) {
                    paths.add(normalized)
                }
            }
        }
        def legacy = payload?.sourcePath?.toString()?.trim()
        if (legacy) {
            paths.add(legacy)
        }
        return paths.toList()
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
        def variants = new LinkedHashSet<String>()
        variants.add(trimmed)
        if (normalized) {
            variants.add(normalized)
            variants.add(normalized + '/')
            variants.add(normalized + '/.keep')
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

    static void walkTree(ContentItemTO node, LinkedHashSet<String> paths) {
        if (node?.uri) {
            paths.add(plainPath(node.uri))
        }
        node?.children?.each { child ->
            walkTree(child, paths)
        }
    }

    /** Depth passed to {@code getContentItemTree}: only direct children are returned per call. */
    private static final int TREE_CHILDREN_DEPTH = 2

    static boolean isFolderItem(ContentItemTO item) {
        if (!item) {
            return false
        }
        if (item.folder || item.isFolder()) {
            return true
        }
        def uri = plainPath(item.uri)
        return uri && !uri.contains('.')
    }

    static ContentItemTO loadTreeNode(def contentService, String site, String path) {
        def candidates = new LinkedHashSet<String>()
        def trimmed = path?.trim()
        def normalized = normalizeFolderPath(trimmed)
        if (trimmed) {
            candidates.add(trimmed)
        }
        if (normalized) {
            candidates.add(normalized)
            candidates.add(normalized + '/')
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
     * Collect all content paths under a folder selection. Uses breadth-first traversal because
     * {@code getContentItemTree(site, path, -1)} only resolves shallow trees in Studio.
     */
    static LinkedHashSet<String> collectPrimaryPaths(def contentService, String site, String path) {
        def paths = new LinkedHashSet<String>()
        def normalized = normalizeFolderPath(path?.trim())
        if (!normalized) {
            return paths
        }

        if (!pathExists(contentService, site, normalized)) {
            paths.add(plainPath(normalized))
            return plainPathSet(paths)
        }

        def root = loadTreeNode(contentService, site, normalized)
        if (!root) {
            paths.add(plainPath(normalized))
            return plainPathSet(paths)
        }

        if (!isFolderItem(root) && !(root.children?.size() > 0)) {
            paths.add(plainPath(root.uri ?: normalized))
            return plainPathSet(paths)
        }

        def visited = new LinkedHashSet<String>()
        def queue = new ArrayDeque<String>()
        queue.add(plainPath(root.uri ?: normalized))

        while (!queue.isEmpty()) {
            def current = queue.poll()
            if (!visited.add(current)) {
                continue
            }
            paths.add(current)

            def node = loadTreeNode(contentService, site, current)
            if (!node?.children) {
                continue
            }

            node.children.each { child ->
                def childPath = plainPath(child?.uri)
                if (!childPath || isKeepFile(childPath)) {
                    return
                }
                paths.add(childPath)
                if (isFolderItem(child)) {
                    queue.add(normalizeFolderPath(childPath))
                }
            }
        }

        return plainPathSet(paths)
    }

    static LinkedHashSet<String> collectDependencyPaths(def dependencyService, String site, Collection<String> seedPaths) {
        def deps = new LinkedHashSet<String>()
        seedPaths.each { seed ->
            try {
                def itemDeps = dependencyService?.getItemSpecificDependencies(site, [seed] as List)
                itemDeps?.each { dep ->
                    if (dep) {
                        deps.add(dep.toString())
                    }
                }
            } catch (Exception e) {
                LOG.warn('Failed to collect dependencies for {} in site {}: {}', seed, site, e.message)
            }
        }
        return deps
    }

    static LinkedHashSet<String> buildAllPaths(
        def contentService,
        def dependencyService,
        String sourceSiteId,
        Collection<String> sourcePaths,
        boolean copyDependencies
    ) {
        def primaryPaths = new LinkedHashSet<String>()
        sourcePaths.each { selection ->
            primaryPaths.addAll(collectPrimaryPaths(contentService, sourceSiteId, selection))
        }

        def dependencyPaths = copyDependencies
            ? collectDependencyPaths(dependencyService, sourceSiteId, primaryPaths)
            : [] as Set

        def allPaths = new LinkedHashSet<String>()
        allPaths.addAll(primaryPaths)
        dependencyPaths.each { dep ->
            if (!primaryPaths.contains(dep) && contentService.contentExists(sourceSiteId, dep)) {
                allPaths.add(dep)
            }
        }

        return withoutKeepFiles(allPaths)
    }

    static LinkedHashSet<String> withoutKeepFiles(Collection paths) {
        def out = new LinkedHashSet<String>()
        paths?.each { entry ->
            def path = plainPath(entry)?.trim()
            if (path && !isKeepFile(path)) {
                out.add(path)
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
