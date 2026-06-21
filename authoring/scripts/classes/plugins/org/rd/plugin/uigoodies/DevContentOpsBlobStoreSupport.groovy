package plugins.org.rd.plugin.uigoodies

import org.craftercms.studio.api.v1.constant.GitRepositories
import org.craftercms.studio.api.v1.to.DeploymentItemTO
import org.craftercms.studio.api.v2.dal.Site
import org.craftercms.studio.api.v2.repository.blob.StudioBlobStore
import org.craftercms.studio.api.v2.repository.blob.StudioBlobStoreResolver
import org.eclipse.jgit.lib.ObjectId
import org.eclipse.jgit.lib.Repository
import org.eclipse.jgit.revwalk.RevCommit
import org.eclipse.jgit.revwalk.RevWalk
import org.eclipse.jgit.treewalk.TreeWalk
import org.slf4j.Logger
import org.slf4j.LoggerFactory

import java.nio.file.DirectoryStream
import java.nio.file.Files
import java.nio.file.Path
import java.util.regex.Pattern

/**
 * Blob store inspection and preview → staging/live asset sync helpers.
 * Uses only sandbox-safe Studio/JGit APIs (no reflection, no XmlSlurper).
 */
final class DevContentOpsBlobStoreSupport {

    private static final Logger LOG = LoggerFactory.getLogger(DevContentOpsBlobStoreSupport)
    private static final String BLOB_CONFIG_PATH = '/config/studio/blob-stores-config.xml'
    private static final String SITE_CONFIG_PATH = '/config/studio/site-config.xml'
    private static final String BLOB_FILE_EXTENSION = 'blob'
    private static final String DEFAULT_STAGING_BRANCH = 'staging'
    private static final String DEFAULT_LIVE_BRANCH = 'live'
    private static final String DEFAULT_SANDBOX_BRANCH = 'master'
    private static final String SYNC_COMMENT = 'uigoodies DevContentOps blob sync'

    private DevContentOpsBlobStoreSupport() {}

    static StudioBlobStoreResolver blobStoreResolver(def applicationContext) {
        return DevContentOpsSupport.safeGetBean(applicationContext, 'blobStoreResolver') as StudioBlobStoreResolver
    }

    static Map fetchBlobStoreOverview(def applicationContext, String siteId, def helper, def contentRepo) {
        Map configParse = parseBlobStoresConfig(siteId, contentRepo)
        List<Map> stores = configParse.stores as List<Map> ?: []
        StudioBlobStoreResolver resolver = blobStoreResolver(applicationContext)
        List<String> activeStoreIds = []
        if (resolver) {
            try {
                List<StudioBlobStore> resolved = resolver.getAll(siteId)
                resolved?.each { StudioBlobStore store ->
                    if (store?.getId()) {
                        activeStoreIds.add(store.getId())
                    }
                }
            } catch (Exception e) {
                LOG.warn('[uigoodies DevContentOps] Failed to resolve blob stores for site {}: {}', siteId, e.message)
            }
        }

        Map envConfig = readPublishingEnvironmentConfig(contentRepo, siteId)
        stores.each { Map store ->
            store.active = activeStoreIds.contains(store.id as String)
            store.treeRoot = deriveTreeRoot(store.pattern as String)
        }

        return [
            success: true,
            configured: stores.size() > 0,
            configPath: BLOB_CONFIG_PATH,
            configPresent: configParse.configPresent,
            stores: stores,
            activeStoreIds: activeStoreIds,
            stagingEnabled: envConfig.stagingEnabled,
            stagingTarget: envConfig.stagingTarget,
            liveTarget: envConfig.liveTarget,
            publishedRepositoryExists: publishedRepositoryExists(contentRepo, siteId)
        ]
    }

    static Map listBlobStoreChildren(
        def applicationContext,
        def helper,
        def contentRepo,
        String siteId,
        String storeId,
        String parentPath
    ) {
        Map overview = fetchBlobStoreOverview(applicationContext, siteId, helper, contentRepo)
        Map store = (overview.stores as List<Map>)?.find { it.id == storeId }
        if (!store) {
            return DevContentOpsSupport.errorMap('Blob store not found: ' + storeId)
        }

        String pattern = store.pattern as String
        Pattern compiled = compilePattern(pattern)
        if (!compiled) {
            return DevContentOpsSupport.errorMap('Invalid blob store pattern')
        }

        String normalizedParent = normalizeSitePath(parentPath)
        if (!normalizedParent) {
            normalizedParent = store.treeRoot as String
        }
        if (!normalizedParent.startsWith('/')) {
            normalizedParent = '/' + normalizedParent
        }
        if (DevContentOpsSupport.containsPathTraversal(normalizedParent)) {
            return DevContentOpsSupport.errorMap('Invalid path: traversal not allowed')
        }

        Path sandboxRoot = helper.buildRepoPath(GitRepositories.SANDBOX, siteId).toAbsolutePath().normalize()
        Path dir = sandboxRoot.resolve(normalizedParent.substring(1)).normalize()
        if (!dir.startsWith(sandboxRoot)) {
            return DevContentOpsSupport.errorMap('Invalid path: traversal not allowed')
        }
        if (!Files.isDirectory(dir)) {
            return [
                success: true,
                storeId: storeId,
                parentPath: normalizedParent,
                entries: []
            ]
        }

        StudioBlobStore blobStore = resolveStoreById(applicationContext, siteId, storeId)
        List<Map> entries = []
        Files.newDirectoryStream(dir).withCloseable { DirectoryStream<Path> stream ->
            stream.each { Path child ->
                String name = child.fileName.toString()
                if (name == '.git' || name.startsWith('.')) {
                    return
                }
                String childPath = normalizedParent == '/' ? '/' + name : normalizedParent + '/' + name
                childPath = normalizeSitePath(childPath)
                if (Files.isDirectory(child)) {
                    entries.add([
                        name: name,
                        path: childPath,
                        folder: true
                    ])
                    return
                }
                if (!Files.isRegularFile(child)) {
                    return
                }

                String assetPath = childPath
                boolean pointerFile = name.endsWith('.' + BLOB_FILE_EXTENSION)
                if (pointerFile) {
                    assetPath = childPath.substring(0, childPath.length() - ('.' + BLOB_FILE_EXTENSION).length())
                }
                if (!compiled.matcher(assetPath).matches()) {
                    return
                }
                Map presence = inspectPresence(helper, contentRepo, blobStore, siteId, assetPath, overview)
                entries.add([
                    name: pointerFile ? name.substring(0, name.length() - ('.' + BLOB_FILE_EXTENSION).length()) : name,
                    path: assetPath,
                    folder: false,
                    repoPointerPath: toRepoPointerPath(assetPath),
                    presence: presence
                ])
            }
        }

        entries.sort { a, b ->
            boolean aFolder = a.folder as boolean
            boolean bFolder = b.folder as boolean
            if (aFolder != bFolder) {
                return aFolder ? -1 : 1
            }
            return (a.name as String).compareToIgnoreCase(b.name as String)
        }

        return [
            success: true,
            storeId: storeId,
            parentPath: normalizedParent,
            entries: entries
        ]
    }

    static Map syncBlobPaths(
        def applicationContext,
        def sitesSvc,
        String siteId,
        String target,
        List<String> paths,
        String storeId
    ) {
        if (!paths || paths.isEmpty()) {
            return DevContentOpsSupport.errorMap('paths array is required')
        }
        String normalizedTarget = DevContentOpsSupport.jsonSafeText(target)?.toLowerCase()
        if (normalizedTarget != 'staging' && normalizedTarget != 'live') {
            return DevContentOpsSupport.errorMap('target must be staging or live')
        }

        def contentRepo = DevContentOpsSupport.contentRepository(applicationContext)
        Map envConfig = readPublishingEnvironmentConfig(contentRepo, siteId)
        String publishTarget
        if (normalizedTarget == 'staging') {
            if (!envConfig.stagingEnabled) {
                return DevContentOpsSupport.errorMap('Staging environment is not enabled for this project')
            }
            publishTarget = envConfig.stagingTarget as String
        } else {
            publishTarget = envConfig.liveTarget as String
        }
        if (!publishTarget) {
            return DevContentOpsSupport.errorMap('Publishing target is not configured')
        }

        StudioBlobStore store = null
        if (storeId) {
            store = resolveStoreById(applicationContext, siteId, storeId)
        }
        List<String> assetPaths = paths.collect { normalizeSitePath(it as String) }.findAll { it }
        if (assetPaths.any { DevContentOpsSupport.containsPathTraversal(it) }) {
            return DevContentOpsSupport.errorMap('Invalid path: traversal not allowed')
        }
        if (!store) {
            store = blobStoreResolver(applicationContext)?.getByPaths(siteId, assetPaths[0] as String)
        }
        if (!store) {
            return DevContentOpsSupport.errorMap('No blob store matches the selected paths')
        }

        Map overview = fetchBlobStoreOverview(applicationContext, siteId, null, contentRepo)
        Map storeMeta = (overview.stores as List<Map>)?.find { it.id == store.getId() }
        if (normalizedTarget == 'staging' && !mappingConfigured(storeMeta, 'staging')) {
            return DevContentOpsSupport.errorMap('Staging mapping is not configured on this blob store')
        }
        if (normalizedTarget == 'live' && !mappingConfigured(storeMeta, 'live')) {
            return DevContentOpsSupport.errorMap('Live mapping is not configured on this blob store')
        }

        Site site = sitesSvc?.getSite(siteId) as Site
        if (!site) {
            return DevContentOpsSupport.errorMap('Site not found')
        }

        if (store.isReadOnly()) {
            return DevContentOpsSupport.errorMap('Blob store is read-only')
        }

        String sandboxBranch = DevContentOpsSupport.jsonSafeText(site.sandboxBranch) ?: DEFAULT_SANDBOX_BRANCH
        String author = resolveCurrentUsername(applicationContext)
        List<DeploymentItemTO> deploymentItems = assetPaths.collect { String assetPath ->
            DeploymentItemTO item = new DeploymentItemTO()
            item.site = siteId
            item.path = assetPath
            item.delete = false
            item.move = false
            return item
        }

        try {
            Set<String> failed = store.publish(
                siteId,
                sandboxBranch,
                deploymentItems,
                publishTarget,
                author,
                SYNC_COMMENT
            ) ?: [] as Set
            List<String> failedPaths = (failed ?: []) as List
            List<String> syncedPaths = assetPaths.findAll { String path -> !failedPaths.contains(path) }
            return [
                success: failedPaths.isEmpty(),
                target: normalizedTarget,
                publishingTarget: publishTarget,
                storeId: store.getId(),
                syncedCount: syncedPaths.size(),
                failedCount: failedPaths.size(),
                syncedPaths: syncedPaths,
                failedPaths: failedPaths,
                message: failedPaths.isEmpty()
                    ? "Synced ${syncedPaths.size()} asset(s) from preview to ${normalizedTarget}."
                    : "Synced ${syncedPaths.size()} asset(s); ${failedPaths.size()} failed."
            ]
        } catch (Exception e) {
            LOG.error('[uigoodies DevContentOps] Blob sync failed for site {}: {}', siteId, e.message, e)
            return DevContentOpsSupport.errorMap('Blob sync failed: ' + e.message)
        }
    }

    private static Map parseBlobStoresConfig(String siteId, def contentRepo) {
        if (!contentRepo || !contentRepo.contentExists(siteId, BLOB_CONFIG_PATH)) {
            return [configPresent: false, stores: []]
        }
        try {
            String xml = readContentAsString(contentRepo, siteId, BLOB_CONFIG_PATH)
            if (!xml?.trim()) {
                return [configPresent: true, stores: []]
            }
            List<Map> stores = parseBlobStoresFromXml(xml)
            return [configPresent: true, stores: stores]
        } catch (Exception e) {
            LOG.warn('[uigoodies DevContentOps] Failed to parse blob store config for {}: {}', siteId, e.message)
            return [configPresent: true, stores: [], parseError: e.message]
        }
    }

    private static List<Map> parseBlobStoresFromXml(String xml) {
        List<Map> stores = []
        def storeMatcher = (xml =~ /(?s)<blobStore>(.*?)<\/blobStore>/)
        while (storeMatcher.find()) {
            String block = storeMatcher.group(1)
            String id = xmlTagText(block, 'id')
            if (!id) {
                continue
            }
            List<Map> mappings = []
            def mappingMatcher = (block =~ /(?s)<mapping>(.*?)<\/mapping>/)
            while (mappingMatcher.find()) {
                String mappingBlock = mappingMatcher.group(1)
                mappings.add([
                    publishingTarget: xmlTagText(mappingBlock, 'publishingTarget'),
                    storeTarget: xmlTagText(mappingBlock, 'storeTarget'),
                    prefix: xmlTagText(mappingBlock, 'prefix')
                ])
            }
            stores.add([
                id: id,
                type: xmlTagText(block, 'type'),
                pattern: xmlTagText(block, 'pattern'),
                readOnly: xmlTagText(block, 'readOnly') == 'true',
                mappings: mappings
            ])
        }
        return stores
    }

    private static Map readPublishingEnvironmentConfig(def contentRepo, String siteId) {
        Map defaults = [
            stagingEnabled: false,
            stagingTarget: DEFAULT_STAGING_BRANCH,
            liveTarget: DEFAULT_LIVE_BRANCH
        ]
        if (!contentRepo || !contentRepo.contentExists(siteId, SITE_CONFIG_PATH)) {
            return defaults
        }
        try {
            String xml = readContentAsString(contentRepo, siteId, SITE_CONFIG_PATH)
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

    private static String readContentAsString(def contentRepo, String siteId, String path) {
        InputStream stream = contentRepo.getContent(siteId, path)
        if (!stream) {
            return ''
        }
        try {
            return new String(stream.readAllBytes(), java.nio.charset.StandardCharsets.UTF_8)
        } finally {
            try {
                stream.close()
            } catch (Exception ignored) {
            }
        }
    }

    private static String resolveCurrentUsername(def applicationContext) {
        Object securityService = applicationContext?.get('studio.securityService')
        if (!securityService) {
            securityService = applicationContext?.get('cstudioSecurityService')
        }
        if (securityService) {
            try {
                def user = securityService.getCurrentUser()
                String username = DevContentOpsSupport.jsonSafeText(user?.toString())
                if (username) {
                    return username
                }
            } catch (Exception ignored) {
            }
        }
        return 'admin'
    }

    private static StudioBlobStore resolveStoreById(def applicationContext, String siteId, String storeId) {
        StudioBlobStoreResolver resolver = blobStoreResolver(applicationContext)
        if (!resolver || !storeId) {
            return null
        }
        try {
            List<StudioBlobStore> all = resolver.getAll(siteId)
            return all?.find { it.getId() == storeId }
        } catch (Exception e) {
            LOG.debug('[uigoodies DevContentOps] resolveStoreById failed: {}', e.message)
            return null
        }
    }

    private static Map inspectPresence(
        def helper,
        def contentRepo,
        StudioBlobStore blobStore,
        String siteId,
        String assetPath,
        Map overview
    ) {
        String repoPointer = toRepoPointerPath(assetPath)
        boolean inRepo = sandboxPointerExists(helper, siteId, repoPointer)
        boolean inPreview = blobAssetExists(blobStore, siteId, assetPath)
        String stagingEnv = overview.stagingTarget as String
        String liveEnv = overview.liveTarget as String
        boolean stagingMapping = false
        boolean liveMapping = false
        Map storeMeta = (overview.stores as List<Map>)?.find { store ->
            Pattern p = compilePattern(store.pattern as String)
            p != null && p.matcher(assetPath).matches()
        }
        if (storeMeta) {
            stagingMapping = mappingConfigured(storeMeta, 'staging')
            liveMapping = mappingConfigured(storeMeta, 'live')
        }

        boolean inStaging = false
        boolean inLive = false
        if (stagingMapping && stagingEnv) {
            inStaging = pointerInPublishedEnvironment(helper, contentRepo, siteId, stagingEnv, repoPointer)
        }
        if (liveMapping && liveEnv) {
            inLive = pointerInPublishedEnvironment(helper, contentRepo, siteId, liveEnv, repoPointer)
        }

        return [
            inRepo: inRepo,
            inPreview: inPreview,
            inStaging: inStaging,
            inLive: inLive,
            stagingConfigured: stagingMapping,
            liveConfigured: liveMapping
        ]
    }

    private static boolean sandboxPointerExists(def helper, String siteId, String repoPointerPath) {
        try {
            Path sandboxRoot = helper.buildRepoPath(GitRepositories.SANDBOX, siteId)
            Path file = sandboxRoot.resolve(repoPointerPath.substring(1))
            return Files.isRegularFile(file)
        } catch (Exception e) {
            return false
        }
    }

    private static boolean blobAssetExists(StudioBlobStore store, String siteId, String assetPath) {
        if (!store) {
            return false
        }
        try {
            return store.contentExists(siteId, assetPath)
        } catch (Exception e) {
            return false
        }
    }

    private static boolean pointerInPublishedEnvironment(
        def helper,
        def contentRepo,
        String siteId,
        String environment,
        String repoPointerPath
    ) {
        if (!contentRepo || !environment || !repoPointerPath) {
            return false
        }
        try {
            if (!contentRepo.commitIdExists(siteId, GitRepositories.PUBLISHED, environment)) {
                return false
            }
            Repository publishedRepo = helper.getRepository(siteId, GitRepositories.PUBLISHED)
            if (!publishedRepo) {
                return false
            }
            String ref = 'refs/heads/' + environment
            return pathExistsAtRef(publishedRepo, ref, repoPointerPath)
        } catch (Exception e) {
            LOG.debug('[uigoodies DevContentOps] Published pointer check failed: {}', e.message)
            return false
        }
    }

    private static boolean pathExistsAtRef(Repository repo, String ref, String path) {
        RevWalk revWalk = null
        TreeWalk walk = null
        try {
            ObjectId commitId = repo.resolve(ref)
            if (!commitId) {
                return false
            }
            String normalized = path.startsWith('/') ? path.substring(1) : path
            revWalk = new RevWalk(repo)
            RevCommit commit = revWalk.parseCommit(commitId)
            walk = new TreeWalk(repo)
            walk.addTree(commit.tree)
            walk.setRecursive(true)
            while (walk.next()) {
                if (walk.pathString == normalized) {
                    return true
                }
            }
            return false
        } catch (Exception e) {
            return false
        } finally {
            try {
                walk?.close()
            } catch (Exception ignored) {
            }
            try {
                revWalk?.close()
            } catch (Exception ignored) {
            }
        }
    }

    private static boolean publishedRepositoryExists(def contentRepo, String siteId) {
        try {
            return contentRepo?.publishedRepositoryExists(siteId)
        } catch (Exception e) {
            return false
        }
    }

    private static boolean mappingConfigured(Map store, String publishingTarget) {
        List<Map> mappings = store?.mappings as List<Map>
        if (!mappings) {
            return false
        }
        return mappings.any { Map mapping ->
            DevContentOpsSupport.jsonSafeText(mapping.publishingTarget)?.equalsIgnoreCase(publishingTarget)
        }
    }

    private static String toRepoPointerPath(String assetPath) {
        String normalized = normalizeSitePath(assetPath)
        if (!normalized || normalized.endsWith('.' + BLOB_FILE_EXTENSION)) {
            return normalized
        }
        return normalized + '.' + BLOB_FILE_EXTENSION
    }

    private static String normalizeSitePath(String path) {
        String p = DevContentOpsSupport.jsonSafeText(path)
        if (!p) {
            return ''
        }
        p = p.replace('\\', '/')
        if (!p.startsWith('/')) {
            p = '/' + p
        }
        while (p.contains('//')) {
            p = p.replace('//', '/')
        }
        if (p.length() > 1 && p.endsWith('/')) {
            p = p.substring(0, p.length() - 1)
        }
        return p
    }

    private static Pattern compilePattern(String pattern) {
        if (!pattern?.trim()) {
            return null
        }
        try {
            return Pattern.compile(pattern.trim())
        } catch (Exception e) {
            return null
        }
    }

    private static String deriveTreeRoot(String pattern) {
        if (!pattern?.trim()) {
            return '/static-assets'
        }
        String p = pattern.trim()
        if (p.startsWith('^')) {
            p = p.substring(1)
        }
        if (p.startsWith('/')) {
            int slash = p.indexOf('/', 1)
            int group = p.indexOf('(')
            int end = p.length()
            if (slash > 0 && slash < end) {
                end = slash
            }
            if (group > 0 && group < end) {
                end = group
            }
            String root = p.substring(0, end)
            if (root.endsWith('/')) {
                root = root.substring(0, root.length() - 1)
            }
            return root ?: '/static-assets'
        }
        return '/static-assets'
    }
}
