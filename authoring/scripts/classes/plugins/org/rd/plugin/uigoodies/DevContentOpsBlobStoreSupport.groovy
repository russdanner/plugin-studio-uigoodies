package plugins.org.rd.plugin.uigoodies

import org.craftercms.commons.config.profiles.aws.S3Profile
import org.craftercms.commons.file.stores.S3Utils
import org.craftercms.studio.api.v1.constant.GitRepositories
import org.craftercms.studio.api.v1.to.DeploymentItemTO
import org.craftercms.studio.api.v2.dal.Site
import org.craftercms.studio.api.v2.repository.blob.StudioBlobStore
import org.craftercms.studio.api.v2.repository.blob.StudioBlobStoreResolver
import software.amazon.awssdk.services.s3.S3Client
import software.amazon.awssdk.services.s3.model.CommonPrefix
import software.amazon.awssdk.services.s3.model.CopyObjectRequest
import software.amazon.awssdk.services.s3.model.DeleteMarkerEntry
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest
import software.amazon.awssdk.services.s3.model.GetObjectRequest
import software.amazon.awssdk.services.s3.model.BucketVersioningStatus
import software.amazon.awssdk.services.s3.model.GetBucketVersioningRequest
import software.amazon.awssdk.services.s3.model.ListObjectsV2Request
import software.amazon.awssdk.services.s3.model.ListObjectVersionsRequest
import software.amazon.awssdk.services.s3.model.ListObjectVersionsResponse
import software.amazon.awssdk.services.s3.model.ObjectVersion
import software.amazon.awssdk.services.s3.model.S3Exception
import software.amazon.awssdk.services.s3.model.S3Object
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
        try {
            Map configParse = parseBlobStoresConfig(applicationContext, siteId, contentRepo)
            List<Map> rawStores = configParse.stores as List<Map> ?: []
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
                } catch (Throwable t) {
                    LOG.warn(
                        '[uigoodies DevContentOps] Failed to resolve blob stores for site {}: {}',
                        siteId,
                        DevContentOpsSupport.jsonSafeText(t.message)
                    )
                }
            }

            Map envConfig = readPublishingEnvironmentConfig(contentRepo, siteId)
            List<Map> stores = sanitizeStoresForResponse(rawStores, activeStoreIds)

            return [
                success: true,
                configured: stores.size() > 0,
                configPath: BLOB_CONFIG_PATH,
                configPresent: Boolean.TRUE == configParse.configPresent,
                stores: stores,
                activeStoreIds: activeStoreIds,
                stagingEnabled: Boolean.TRUE == envConfig.stagingEnabled,
                stagingTarget: DevContentOpsSupport.jsonSafeText(envConfig.stagingTarget),
                liveTarget: DevContentOpsSupport.jsonSafeText(envConfig.liveTarget),
                publishedRepositoryExists: publishedRepositoryExists(contentRepo, siteId)
            ]
        } catch (Throwable t) {
            LOG.error('[uigoodies DevContentOps] fetchBlobStoreOverview failed for {}: {}', siteId, t.message, t)
            return DevContentOpsSupport.errorMap(
                'Failed to load blob store overview: ' + DevContentOpsSupport.jsonSafeText(t.message)
            )
        }
    }

    private static List<Map> sanitizeStoresForResponse(List<Map> rawStores, List<String> activeStoreIds) {
        List<Map> stores = []
        (rawStores ?: []).each { Map store ->
            if (!store) {
                return
            }
            String id = DevContentOpsSupport.jsonSafeText(store.id)
            if (!id) {
                return
            }
            String type = DevContentOpsSupport.jsonSafeText(store.type)
            List<Map> mappings = []
            (store.mappings as List<Map> ?: []).each { Map mapping ->
                if (!mapping) {
                    return
                }
                String publishingTarget = DevContentOpsSupport.jsonSafeText(mapping.publishingTarget)
                if (!publishingTarget) {
                    return
                }
                mappings.add([
                    publishingTarget: publishingTarget,
                    storeTarget: DevContentOpsSupport.jsonSafeText(mapping.storeTarget),
                    prefix: mapping.prefix ? DevContentOpsSupport.jsonSafeText(mapping.prefix) : null
                ])
            }
            Map sanitized = [
                id: id,
                type: type,
                pattern: DevContentOpsSupport.jsonSafeText(store.pattern),
                readOnly: Boolean.TRUE == store.readOnly,
                active: activeStoreIds.contains(id),
                treeRoot: deriveTreeRoot(store.pattern as String),
                versioningSupported: type == 's3BlobStore',
                mappings: mappings
            ]
            if (store.versioningNote) {
                sanitized.versioningNote = DevContentOpsSupport.jsonSafeText(store.versioningNote)
            }
            stores.add(sanitized)
        }
        return stores
    }

    static Map listBlobStoreChildren(
        def applicationContext,
        def helper,
        def contentRepo,
        String siteId,
        String storeId,
        String parentPath
    ) {
        try {
            if (!helper) {
                return DevContentOpsSupport.errorMap('Git services are not available in Studio')
            }
            Map overview = fetchBlobStoreOverview(applicationContext, siteId, helper, contentRepo)
            if (overview.error) {
                return overview
            }
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

        if ((store.type as String) == 's3BlobStore') {
            return listS3BlobStoreChildren(
                applicationContext,
                helper,
                contentRepo,
                siteId,
                storeId,
                store,
                overview,
                normalizedParent
            )
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
        } catch (Throwable e) {
            LOG.warn('[uigoodies DevContentOps] listBlobStoreChildren failed for site {} store {}: {}', siteId, storeId, e.message)
            return DevContentOpsSupport.errorMap(
                'Failed to list blob store children: ' + DevContentOpsSupport.jsonSafeText(e.message)
            )
        }
    }

    private static Map listS3BlobStoreChildren(
        def applicationContext,
        def helper,
        def contentRepo,
        String siteId,
        String storeId,
        Map store,
        Map overview,
        String normalizedParent
    ) {
        Pattern compiled = compilePattern(store.pattern as String)
        if (!compiled) {
            return DevContentOpsSupport.errorMap('Invalid blob store pattern')
        }

        Map mapping = resolveMapping(applicationContext, siteId, store, 'preview')
        if (!mapping) {
            return DevContentOpsSupport.errorMap('No preview mapping configured for this blob store')
        }

        String bucket = DevContentOpsSupport.jsonSafeText(mapping.storeTarget)
        if (!bucket) {
            return DevContentOpsSupport.errorMap('Preview bucket is not configured')
        }

        String listPrefix = buildObjectKey(mapping, normalizedParent)
        if (!listPrefix) {
            listPrefix = ''
        }
        if (!listPrefix.endsWith('/')) {
            listPrefix = listPrefix + '/'
        }

        Map clientHandle = null
        try {
            clientHandle = openS3ClientHandle(applicationContext, siteId, store)
            S3Client client = clientFromHandle(clientHandle)
            if (!client) {
                return DevContentOpsSupport.errorMap('S3 client is not available')
            }

            StudioBlobStore blobStore = resolveStoreById(applicationContext, siteId, storeId)
            List<Map> entries = []
            Set<String> seenPaths = new LinkedHashSet<>()
            String continuationToken = null

            while (true) {
                ListObjectsV2Request.Builder requestBuilder = ListObjectsV2Request.builder()
                    .bucket(bucket)
                    .prefix(listPrefix)
                    .delimiter('/')
                    .maxKeys(1000)
                if (continuationToken) {
                    requestBuilder.continuationToken(continuationToken)
                }
                def response = client.listObjectsV2(requestBuilder.build())

                (response?.commonPrefixes() ?: []).each { CommonPrefix commonPrefix ->
                    String key = DevContentOpsSupport.jsonSafeText(commonPrefix?.prefix())
                    if (!key || key == listPrefix) {
                        return
                    }
                    String folderKey = key.endsWith('/') ? key.substring(0, key.length() - 1) : key
                    String childPath = normalizeSitePath(keyToSitePath(mapping, folderKey))
                    if (!childPath || seenPaths.contains(childPath)) {
                        return
                    }
                    String name = childPath.substring(childPath.lastIndexOf('/') + 1)
                    if (!name) {
                        return
                    }
                    seenPaths.add(childPath)
                    entries.add([
                        name: name,
                        path: childPath,
                        folder: true
                    ])
                }

                (response?.contents() ?: []).each { S3Object obj ->
                    String key = DevContentOpsSupport.jsonSafeText(obj?.key())
                    if (!key || key == listPrefix || key.endsWith('/')) {
                        return
                    }
                    String relative = key.length() > listPrefix.length() ? key.substring(listPrefix.length()) : ''
                    if (!relative || relative.contains('/')) {
                        return
                    }
                    String sitePath = normalizeSitePath(keyToSitePath(mapping, key))
                    if (!compiled.matcher(sitePath).matches()) {
                        return
                    }
                    if (seenPaths.contains(sitePath)) {
                        return
                    }
                    seenPaths.add(sitePath)
                    Map presence = inspectPresence(helper, contentRepo, blobStore, siteId, sitePath, overview)
                    String displayName = sitePath.substring(sitePath.lastIndexOf('/') + 1)
                    entries.add([
                        name: displayName,
                        path: sitePath,
                        folder: false,
                        repoPointerPath: toRepoPointerPath(sitePath),
                        presence: presence
                    ])
                }

                if (!Boolean.TRUE.equals(response?.isTruncated())) {
                    break
                }
                continuationToken = DevContentOpsSupport.jsonSafeText(response.nextContinuationToken())
                if (!continuationToken) {
                    break
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
        } catch (Exception e) {
            LOG.warn(
                '[uigoodies DevContentOps] listS3BlobStoreChildren failed for site {} store {} path {}: {}',
                siteId,
                storeId,
                normalizedParent,
                e.message
            )
            return DevContentOpsSupport.errorMap(
                'Failed to list storage contents: ' + DevContentOpsSupport.jsonSafeText(e.message)
            )
        } finally {
            releaseS3ClientHandle(clientHandle)
        }
    }

    static Map listBlobVersions(
        def applicationContext,
        def contentRepo,
        String siteId,
        String storeId,
        String assetPath,
        String publishingTarget
    ) {
        Map storeResult = resolveStoreForAssetOps(applicationContext, contentRepo, siteId, storeId, assetPath)
        if (storeResult.error) {
            return storeResult.error as Map
        }
        Map store = storeResult.store as Map
        if ((store.type as String) != 's3BlobStore') {
            return DevContentOpsSupport.errorMap('Version history is only supported for S3 blob stores')
        }

        String rawTarget = DevContentOpsSupport.jsonSafeText(publishingTarget)
        String target = rawTarget ? normalizePublishingTarget(rawTarget) : 'preview'
        if (!target) {
            return DevContentOpsSupport.errorMap('target must be preview, staging, or live')
        }
        Map mapping = resolveMapping(applicationContext, siteId, store, target)
        if (!mapping) {
            return DevContentOpsSupport.errorMap("No mapping for publishing target: ${target}")
        }

        String bucket = DevContentOpsSupport.jsonSafeText(mapping.storeTarget)
        String objectKey = buildObjectKey(mapping, assetPath)
        if (!bucket || !objectKey) {
            return DevContentOpsSupport.errorMap('Could not resolve S3 bucket/key for this asset')
        }

        Map clientHandle = null
        try {
            clientHandle = openS3ClientHandle(applicationContext, siteId, store)
            S3Client client = clientFromHandle(clientHandle)
            if (!client) {
                return DevContentOpsSupport.errorMap('S3 client is not available')
            }

            ListObjectVersionsRequest request = ListObjectVersionsRequest.builder()
                .bucket(bucket)
                .prefix(objectKey)
                .build()
            ListObjectVersionsResponse response = client.listObjectVersions(request)
            List<Map> versions = []
            boolean currentlyDeleted = false
            (response?.versions() ?: []).each { ObjectVersion version ->
                if (version?.key() != objectKey) {
                    return
                }
                Map versionIdFields = normalizeS3VersionId(version?.versionId())
                versions.add([
                    versionId: versionIdFields.apiVersionId,
                    versionLabel: versionIdFields.versionLabel,
                    legacyNullVersion: versionIdFields.legacyNullVersion,
                    key: objectKey,
                    lastModified: version.lastModified()?.toString(),
                    size: version.size() ?: 0L,
                    latest: Boolean.TRUE == version.isLatest(),
                    deleteMarker: false,
                    contentType: contentTypeForPath(assetPath),
                    etag: DevContentOpsSupport.jsonSafeText(version.eTag())
                ])
            }
            (response?.deleteMarkers() ?: []).each { DeleteMarkerEntry marker ->
                if (marker?.key() != objectKey) {
                    return
                }
                boolean latest = Boolean.TRUE == marker.isLatest()
                if (latest) {
                    currentlyDeleted = true
                }
                Map versionIdFields = normalizeS3VersionId(marker?.versionId())
                versions.add([
                    versionId: versionIdFields.apiVersionId,
                    versionLabel: versionIdFields.versionLabel,
                    legacyNullVersion: versionIdFields.legacyNullVersion,
                    key: objectKey,
                    lastModified: marker.lastModified()?.toString(),
                    size: 0L,
                    latest: latest,
                    deleteMarker: true,
                    etag: null
                ])
            }
            versions.sort { a, b ->
                String aDate = a.lastModified as String
                String bDate = b.lastModified as String
                return bDate <=> aDate
            }

            return [
                success: true,
                storeId: store.id,
                path: normalizeSitePath(assetPath),
                publishingTarget: target,
                bucket: bucket,
                objectKey: objectKey,
                currentlyDeleted: currentlyDeleted,
                versionCount: versions.size(),
                versions: versions
            ]
        } catch (Exception e) {
            LOG.warn('[uigoodies DevContentOps] listBlobVersions failed for {} {}: {}', siteId, assetPath, e.message)
            return DevContentOpsSupport.errorMap('Failed to list blob versions: ' + e.message)
        } finally {
            releaseS3ClientHandle(clientHandle)
        }
    }

    static Map getBlobVersionPreviewUrl(
        def applicationContext,
        def contentRepo,
        String siteId,
        String storeId,
        String assetPath,
        String versionId,
        String publishingTarget
    ) {
        String normalizedVersionId = requireS3VersionIdForRequest(versionId)
        if (!normalizedVersionId) {
            return DevContentOpsSupport.errorMap('versionId is required')
        }

        Map storeResult = resolveStoreForAssetOps(applicationContext, contentRepo, siteId, storeId, assetPath)
        if (storeResult.error) {
            return storeResult.error as Map
        }
        Map store = storeResult.store as Map
        if ((store.type as String) != 's3BlobStore') {
            return DevContentOpsSupport.errorMap('Version preview is only supported for S3 blob stores')
        }

        String rawTarget = DevContentOpsSupport.jsonSafeText(publishingTarget)
        String target = rawTarget ? normalizePublishingTarget(rawTarget) : 'preview'
        if (!target) {
            return DevContentOpsSupport.errorMap('target must be preview, staging, or live')
        }
        Map mapping = resolveMapping(applicationContext, siteId, store, target)
        if (!mapping) {
            return DevContentOpsSupport.errorMap("No mapping for publishing target: ${target}")
        }

        String bucket = DevContentOpsSupport.jsonSafeText(mapping.storeTarget)
        String objectKey = buildObjectKey(mapping, assetPath)
        if (!bucket || !objectKey) {
            return DevContentOpsSupport.errorMap('Could not resolve S3 bucket/key for this asset')
        }

        String contentType = contentTypeForPath(assetPath)
        String previewUrl = buildBlobVersionStreamUrl(
            siteId, store.id as String, normalizeSitePath(assetPath), normalizedVersionId, target
        )

        return [
            success: true,
            storeId: store.id,
            path: normalizeSitePath(assetPath),
            publishingTarget: target,
            bucket: bucket,
            objectKey: objectKey,
            versionId: normalizedVersionId,
            versionLabel: normalizeS3VersionId(versionId).versionLabel,
            previewUrl: DevContentOpsSupport.jsonSafeText(previewUrl),
            contentType: contentType,
            inlinePreview: isInlinePreviewType(contentType)
        ]
    }

    /**
     * Opens a specific S3 object version for streaming. Caller must close {@code inputStream} and
     * call {@link #releaseS3ClientHandle(java.util.Map)} on {@code s3ClientHandle}.
     */
    static Map openBlobVersionContent(
        def applicationContext,
        def contentRepo,
        String siteId,
        String storeId,
        String assetPath,
        String versionId,
        String publishingTarget
    ) {
        String normalizedVersionId = requireS3VersionIdForRequest(versionId)
        if (!normalizedVersionId) {
            return DevContentOpsSupport.errorMap('versionId is required')
        }

        Map storeResult = resolveStoreForAssetOps(applicationContext, contentRepo, siteId, storeId, assetPath)
        if (storeResult.error) {
            return storeResult.error as Map
        }
        Map store = storeResult.store as Map
        if ((store.type as String) != 's3BlobStore') {
            return DevContentOpsSupport.errorMap('Version preview is only supported for S3 blob stores')
        }

        String rawTarget = DevContentOpsSupport.jsonSafeText(publishingTarget)
        String target = rawTarget ? normalizePublishingTarget(rawTarget) : 'preview'
        if (!target) {
            return DevContentOpsSupport.errorMap('target must be preview, staging, or live')
        }
        Map mapping = resolveMapping(applicationContext, siteId, store, target)
        if (!mapping) {
            return DevContentOpsSupport.errorMap("No mapping for publishing target: ${target}")
        }

        String bucket = DevContentOpsSupport.jsonSafeText(mapping.storeTarget)
        String objectKey = buildObjectKey(mapping, assetPath)
        if (!bucket || !objectKey) {
            return DevContentOpsSupport.errorMap('Could not resolve S3 bucket/key for this asset')
        }

        Map clientHandle = null
        java.io.InputStream objectStream = null
        try {
            clientHandle = openS3ClientHandle(applicationContext, siteId, store)
            S3Client client = clientFromHandle(clientHandle)
            if (!client) {
                return DevContentOpsSupport.errorMap('S3 client is not available')
            }

            GetObjectRequest getObjectRequest = GetObjectRequest.builder()
                .bucket(bucket)
                .key(objectKey)
                .versionId(normalizedVersionId)
                .build()
            objectStream = client.getObject(getObjectRequest)
            String contentType = contentTypeForPath(assetPath)
            String fileName = objectKey.contains('/') ? objectKey.substring(objectKey.lastIndexOf('/') + 1) : objectKey

            return [
                success: true,
                contentType: contentType,
                fileName: fileName,
                inputStream: objectStream,
                s3ClientHandle: clientHandle
            ]
        } catch (Exception e) {
            try {
                objectStream?.close()
            } catch (Exception ignored) {
            }
            releaseS3ClientHandle(clientHandle)
            LOG.warn('[uigoodies DevContentOps] openBlobVersionContent failed for {} {}: {}', siteId, assetPath, e.message)
            return DevContentOpsSupport.errorMap('Failed to open blob version: ' + e.message)
        }
    }

    static Map restoreBlobVersion(
        def applicationContext,
        def contentRepo,
        String siteId,
        String storeId,
        String assetPath,
        String versionId,
        String publishingTarget,
        boolean deleteMarker = false
    ) {
        String normalizedVersionId = requireS3VersionIdForRequest(versionId)
        if (!normalizedVersionId) {
            return DevContentOpsSupport.errorMap('versionId is required')
        }

        Map storeResult = resolveStoreForAssetOps(applicationContext, contentRepo, siteId, storeId, assetPath)
        if (storeResult.error) {
            return storeResult.error as Map
        }
        Map store = storeResult.store as Map
        if (store.readOnly) {
            return DevContentOpsSupport.errorMap('Blob store is read-only')
        }
        if ((store.type as String) != 's3BlobStore') {
            return DevContentOpsSupport.errorMap('Version restore is only supported for S3 blob stores')
        }

        String rawTarget = DevContentOpsSupport.jsonSafeText(publishingTarget)
        String target = rawTarget ? normalizePublishingTarget(rawTarget) : 'preview'
        if (!target) {
            return DevContentOpsSupport.errorMap('target must be preview, staging, or live')
        }
        Map mapping = resolveMapping(applicationContext, siteId, store, target)
        if (!mapping) {
            return DevContentOpsSupport.errorMap("No mapping for publishing target: ${target}")
        }

        String bucket = DevContentOpsSupport.jsonSafeText(mapping.storeTarget)
        String objectKey = buildObjectKey(mapping, assetPath)
        if (!bucket || !objectKey) {
            return DevContentOpsSupport.errorMap('Could not resolve S3 bucket/key for this asset')
        }

        Map clientHandle = null
        try {
            clientHandle = openS3ClientHandle(applicationContext, siteId, store)
            S3Client client = clientFromHandle(clientHandle)
            if (!client) {
                return DevContentOpsSupport.errorMap('S3 client is not available')
            }

            if (deleteMarker) {
                DeleteObjectRequest deleteRequest = DeleteObjectRequest.builder()
                    .bucket(bucket)
                    .key(objectKey)
                    .versionId(normalizedVersionId)
                    .build()
                client.deleteObject(deleteRequest)
                Map pointerResult = ensureSandboxBlobPointer(
                    applicationContext, siteId, store.id as String, normalizeSitePath(assetPath), true
                )
                String message = "Restored ${normalizeSitePath(assetPath)} by removing the delete marker in ${target}."
                message += pointerResultMessage(pointerResult)
                return [
                    success: true,
                    storeId: store.id,
                    path: normalizeSitePath(assetPath),
                    publishingTarget: target,
                    bucket: bucket,
                    objectKey: objectKey,
                    restoredFromVersionId: normalizedVersionId,
                    deleteMarkerRemoved: true,
                    pointerRestored: Boolean.TRUE == pointerResult.pointerRestored,
                    pointerPath: pointerResult.pointerPath,
                    pointerError: pointerResult.pointerError,
                    message: message
                ]
            }

            CopyObjectRequest copyRequest = CopyObjectRequest.builder()
                .sourceBucket(bucket)
                .sourceKey(objectKey)
                .sourceVersionId(normalizedVersionId)
                .destinationBucket(bucket)
                .destinationKey(objectKey)
                .build()
            def copyResponse = client.copyObject(copyRequest)
            Map pointerResult = ensureSandboxBlobPointer(
                applicationContext, siteId, store.id as String, normalizeSitePath(assetPath)
            )
            String message = "Restored ${normalizeSitePath(assetPath)} from version ${normalizedVersionId} in ${target}."
            message += pointerResultMessage(pointerResult)
            return [
                success: true,
                storeId: store.id,
                path: normalizeSitePath(assetPath),
                publishingTarget: target,
                bucket: bucket,
                objectKey: objectKey,
                restoredFromVersionId: normalizedVersionId,
                newVersionId: DevContentOpsSupport.jsonSafeText(copyResponse?.versionId()),
                pointerRestored: Boolean.TRUE == pointerResult.pointerRestored,
                pointerPath: pointerResult.pointerPath,
                pointerError: pointerResult.pointerError,
                message: message
            ]
        } catch (Exception e) {
            LOG.error('[uigoodies DevContentOps] restoreBlobVersion failed for {} {}: {}', siteId, assetPath, e.message, e)
            return DevContentOpsSupport.errorMap('Failed to restore blob version: ' + e.message)
        } finally {
            releaseS3ClientHandle(clientHandle)
        }
    }

    static Map listDeletedBlobs(
        def applicationContext,
        def contentRepo,
        String siteId,
        String storeId,
        String publishingTarget,
        int maxResults = 200
    ) {
        Map configParse = parseBlobStoresConfig(applicationContext, siteId, contentRepo)
        Map store = (configParse.stores as List<Map>)?.find { it.id == storeId }
        if (!store) {
            return DevContentOpsSupport.errorMap('Blob store not found: ' + storeId)
        }
        if ((store.type as String) != 's3BlobStore') {
            return DevContentOpsSupport.errorMap('Deleted blob listing is only supported for S3 blob stores')
        }

        String rawTarget = DevContentOpsSupport.jsonSafeText(publishingTarget)
        String target = rawTarget ? normalizePublishingTarget(rawTarget) : 'preview'
        if (!target) {
            return DevContentOpsSupport.errorMap('target must be preview, staging, or live')
        }
        Map mapping = resolveMapping(applicationContext, siteId, store, target)
        if (!mapping) {
            return DevContentOpsSupport.errorMap("No mapping for publishing target: ${target}")
        }

        String bucket = DevContentOpsSupport.jsonSafeText(mapping.storeTarget)
        String treeRoot = store.treeRoot as String ?: deriveTreeRoot(store.pattern as String)
        String keyPrefix = buildObjectKey(mapping, treeRoot)
        if (!keyPrefix.endsWith('/')) {
            keyPrefix = keyPrefix + '/'
        }
        Pattern compiled = compilePattern(store.pattern as String)
        if (!compiled) {
            return DevContentOpsSupport.errorMap('Invalid blob store pattern')
        }

        Map clientHandle = null
        try {
            clientHandle = openS3ClientHandle(applicationContext, siteId, store)
            S3Client client = clientFromHandle(clientHandle)
            if (!client) {
                return DevContentOpsSupport.errorMap('S3 client is not available')
            }

            List<Map> entries = []
            String keyMarker = null
            String versionIdMarker = null
            int limit = Math.max(1, Math.min(maxResults, 500))

            while (entries.size() < limit) {
                ListObjectVersionsRequest.Builder requestBuilder = ListObjectVersionsRequest.builder()
                    .bucket(bucket)
                    .prefix(keyPrefix)
                    .maxKeys(500)
                if (keyMarker) {
                    requestBuilder.keyMarker(keyMarker)
                }
                if (versionIdMarker) {
                    requestBuilder.versionIdMarker(versionIdMarker)
                }
                ListObjectVersionsResponse response = client.listObjectVersions(requestBuilder.build())

                (response?.deleteMarkers() ?: []).each { DeleteMarkerEntry marker ->
                    if (!Boolean.TRUE.equals(marker?.isLatest())) {
                        return
                    }
                    String markerKey = DevContentOpsSupport.jsonSafeText(marker?.key())
                    if (!markerKey) {
                        return
                    }
                    String sitePath = keyToSitePath(mapping, markerKey)
                    if (!compiled.matcher(sitePath).matches()) {
                        return
                    }
                    entries.add([
                        path: sitePath,
                        objectKey: markerKey,
                        versionId: DevContentOpsSupport.jsonSafeText(marker.versionId()),
                        lastModified: marker.lastModified()?.toString(),
                        deleteMarker: true
                    ])
                }

                if (!Boolean.TRUE.equals(response?.isTruncated())) {
                    break
                }
                keyMarker = DevContentOpsSupport.jsonSafeText(response.nextKeyMarker())
                versionIdMarker = DevContentOpsSupport.jsonSafeText(response.nextVersionIdMarker())
                if (!keyMarker && !versionIdMarker) {
                    break
                }
            }

            entries = entries.unique { it.path as String }
            entries.sort { a, b ->
                String aDate = a.lastModified as String
                String bDate = b.lastModified as String
                return bDate <=> aDate
            }
            if (entries.size() > limit) {
                entries = entries.subList(0, limit)
            }

            return [
                success: true,
                storeId: store.id,
                publishingTarget: target,
                bucket: bucket,
                prefix: keyPrefix,
                deletedCount: entries.size(),
                entries: entries
            ]
        } catch (Exception e) {
            LOG.warn('[uigoodies DevContentOps] listDeletedBlobs failed for {}: {}', siteId, e.message)
            return DevContentOpsSupport.errorMap('Failed to list deleted blobs: ' + e.message)
        } finally {
            releaseS3ClientHandle(clientHandle)
        }
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

    private static Map parseBlobStoresConfig(def applicationContext, String siteId, def contentRepo) {
        if (!contentRepo) {
            return [configPresent: false, stores: []]
        }
        try {
            if (!contentRepo.contentExists(siteId, BLOB_CONFIG_PATH)) {
                return [configPresent: false, stores: []]
            }
        } catch (Throwable t) {
            LOG.warn(
                '[uigoodies DevContentOps] blob store config lookup failed for {}: {}',
                siteId,
                DevContentOpsSupport.jsonSafeText(t.message)
            )
            return [configPresent: false, stores: []]
        }
        Map fromService = parseBlobStoresFromConfigurationService(applicationContext, siteId)
        if (fromService != null) {
            return fromService
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

    /**
     * Uses Studio ConfigurationService so ${env:...}, ${sys:...}, and ${enc:...} placeholders
     * are resolved the same way as the native blob store resolver.
     */
    private static Map parseBlobStoresFromConfigurationService(def applicationContext, String siteId) {
        def configurationService = DevContentOpsSupport.configurationService(applicationContext)
        if (!configurationService) {
            return null
        }
        try {
            def config = configurationService.getXmlConfiguration(siteId, BLOB_CONFIG_PATH)
            if (!config) {
                return [configPresent: true, stores: []]
            }
            List<Map> stores = parseBlobStoresFromHierarchicalConfiguration(config)
            return [configPresent: true, stores: stores]
        } catch (Exception e) {
            LOG.warn(
                '[uigoodies DevContentOps] ConfigurationService blob store read failed for {}: {}',
                siteId,
                e.message
            )
            return null
        }
    }

    private static List<Map> parseBlobStoresFromHierarchicalConfiguration(def config) {
        List<Map> stores = []
        List storeConfigs = config.configurationsAt('blobStore')
        storeConfigs?.each { storeConfig ->
            String id = DevContentOpsSupport.jsonSafeText(storeConfig.getString('id'))
            if (!id) {
                return
            }

            List<Map> mappings = []
            storeConfig.configurationsAt('mappings.mapping')?.each { mapping ->
                mappings.add([
                    publishingTarget: DevContentOpsSupport.jsonSafeText(mapping.getString('publishingTarget')),
                    storeTarget: DevContentOpsSupport.jsonSafeText(mapping.getString('storeTarget')),
                    prefix: DevContentOpsSupport.jsonSafeText(mapping.getString('prefix'))
                ])
            }

            Map s3Configuration = [:]
            try {
                def cfgAt = storeConfig.configurationAt('configuration')
                if (cfgAt) {
                    s3Configuration = [
                        region: DevContentOpsSupport.jsonSafeText(cfgAt.getString('region')) ?: 'us-east-1',
                        endpoint: DevContentOpsSupport.jsonSafeText(cfgAt.getString('endpoint')),
                        pathStyleAccess: Boolean.TRUE == cfgAt.getBoolean('pathStyleAccess', false)
                    ]
                    if (cfgAt.containsKey('credentials.accessKey')) {
                        String accessKey = staticS3Credential(cfgAt.getString('credentials.accessKey'))
                        if (accessKey) {
                            s3Configuration.accessKey = accessKey
                        }
                    }
                    if (cfgAt.containsKey('credentials.secretKey')) {
                        String secretKey = staticS3Credential(cfgAt.getString('credentials.secretKey'))
                        if (secretKey) {
                            s3Configuration.secretKey = secretKey
                        }
                    }
                }
            } catch (Exception ignored) {
            }

            stores.add([
                id: id,
                type: DevContentOpsSupport.jsonSafeText(storeConfig.getString('type')),
                pattern: DevContentOpsSupport.jsonSafeText(storeConfig.getString('pattern')),
                readOnly: Boolean.TRUE == storeConfig.getBoolean('readOnly', false),
                mappings: mappings,
                s3Configuration: s3Configuration
            ])
        }
        return stores
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
                mappings: mappings,
                s3Configuration: parseS3Configuration(block)
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
        if (!contentRepo) {
            return defaults
        }
        try {
            if (!contentRepo.contentExists(siteId, SITE_CONFIG_PATH)) {
                return defaults
            }
        } catch (Throwable t) {
            LOG.debug(
                '[uigoodies DevContentOps] site-config lookup failed for {}: {}',
                siteId,
                DevContentOpsSupport.jsonSafeText(t.message)
            )
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

    private static Map parseS3Configuration(String blobStoreBlock) {
        String configBlock = xmlBlock(blobStoreBlock, 'configuration')
        if (!configBlock) {
            return [:]
        }
        String credBlock = xmlBlock(configBlock, 'credentials')
        Map cfg = [
            region: xmlTagText(configBlock, 'region') ?: 'us-east-1',
            endpoint: xmlTagText(configBlock, 'endpoint'),
            pathStyleAccess: xmlTagText(configBlock, 'pathStyleAccess') == 'true'
        ]
        String accessKey = staticS3Credential(xmlTagText(credBlock, 'accessKey'))
        String secretKey = staticS3Credential(xmlTagText(credBlock, 'secretKey'))
        if (accessKey) {
            cfg.accessKey = accessKey
        }
        if (secretKey) {
            cfg.secretKey = secretKey
        }
        return cfg
    }

    private static Map resolveStoreForAssetOps(def applicationContext, def contentRepo, String siteId, String storeId, String assetPath) {
        String normalizedPath = normalizeSitePath(assetPath)
        if (!normalizedPath) {
            return [error: DevContentOpsSupport.errorMap('path is required')]
        }
        if (DevContentOpsSupport.containsPathTraversal(normalizedPath)) {
            return [error: DevContentOpsSupport.errorMap('Invalid path: traversal not allowed')]
        }
        Map configParse = parseBlobStoresConfig(applicationContext, siteId, contentRepo)
        Map store = (configParse.stores as List<Map>)?.find { it.id == storeId }
        if (!store) {
            return [error: DevContentOpsSupport.errorMap('Blob store not found: ' + storeId)]
        }
        Pattern compiled = compilePattern(store.pattern as String)
        if (!compiled || !compiled.matcher(normalizedPath).matches()) {
            return [error: DevContentOpsSupport.errorMap('Path does not match blob store pattern')]
        }
        return [store: store]
    }

    private static String normalizePublishingTarget(String target) {
        String normalized = DevContentOpsSupport.jsonSafeText(target)?.toLowerCase()
        if (normalized in ['preview', 'staging', 'live']) {
            return normalized
        }
        return null
    }

    private static Map resolveMapping(def applicationContext, String siteId, Map store, String publishingTarget) {
        return resolveMappingFromParsedStore(store, publishingTarget)
    }

    private static Map resolveMappingFromParsedStore(Map store, String publishingTarget) {
        List<Map> mappings = store?.mappings as List<Map>
        if (!mappings) {
            return null
        }
        return mappings.find { Map mapping ->
            DevContentOpsSupport.jsonSafeText(mapping.publishingTarget)?.equalsIgnoreCase(publishingTarget)
        }
    }

    private static String buildObjectKey(Map mapping, String assetPath) {
        String prefix = DevContentOpsSupport.jsonSafeText(mapping?.prefix)
        String path = normalizeSitePath(assetPath)
        if (path.startsWith('/')) {
            path = path.substring(1)
        }
        if (!prefix) {
            return path
        }
        prefix = prefix.replaceAll(/^\/+/, '')
        if (prefix.endsWith('/')) {
            return prefix + path
        }
        return prefix + '/' + path
    }

    private static String keyToSitePath(Map mapping, String objectKey) {
        String key = DevContentOpsSupport.jsonSafeText(objectKey)
        if (!key) {
            return ''
        }
        String prefix = DevContentOpsSupport.jsonSafeText(mapping?.prefix)
        if (prefix) {
            prefix = prefix.replaceAll(/^\/+/, '')
            if (prefix.endsWith('/')) {
                if (key.startsWith(prefix)) {
                    return normalizeSitePath('/' + key.substring(prefix.length()))
                }
            } else if (key.startsWith(prefix + '/')) {
                return normalizeSitePath('/' + key.substring(prefix.length() + 1))
            } else if (key == prefix) {
                return '/'
            }
        }
        return normalizeSitePath('/' + key)
    }

    private static S3Profile buildS3Profile(def applicationContext, String siteId, Map store) {
        String storeId = DevContentOpsSupport.jsonSafeText(store?.id)
        S3Profile fromMapper = profileFromConfigurationMapper(applicationContext, siteId, storeId)
        if (fromMapper) {
            return fromMapper
        }
        return buildS3ProfileFromMap(store)
    }

    private static List<String> resolveBucketNames(Map store, Map envConfig = null) {
        boolean stagingEnabled = envConfig == null || Boolean.TRUE == envConfig.stagingEnabled
        List<String> buckets = []
        (store.mappings as List<Map> ?: []).each { Map mapping ->
            String publishingTarget = DevContentOpsSupport.jsonSafeText(mapping?.publishingTarget)?.toLowerCase()
            if (!publishingTarget) {
                return
            }
            if ('staging' == publishingTarget && !stagingEnabled) {
                return
            }
            if (!(publishingTarget in ['preview', 'staging', 'live'])) {
                return
            }
            String bucket = DevContentOpsSupport.jsonSafeText(mapping?.storeTarget)
            if (bucket && !buckets.contains(bucket)) {
                buckets.add(bucket)
            }
        }
        return buckets
    }

    /**
     * Build an S3 profile the same way {@code AbstractBlobStore#init} does via {@code crafter.s3ProfileMapper}.
     */
    private static S3Profile profileFromConfigurationMapper(def applicationContext, String siteId, String storeId) {
        if (!siteId || !storeId) {
            return null
        }
        def profileMapper = DevContentOpsSupport.safeGetBean(applicationContext, 'crafter.s3ProfileMapper')
        def configurationService = DevContentOpsSupport.configurationService(applicationContext)
        if (!profileMapper || !configurationService) {
            return null
        }
        try {
            def xmlConfig = configurationService.getXmlConfiguration(siteId, BLOB_CONFIG_PATH)
            if (!xmlConfig) {
                return null
            }
            def storeConfig = xmlConfig.configurationsAt('blobStore')?.find { cfg ->
                DevContentOpsSupport.jsonSafeText(cfg.getString('id')) == storeId
            }
            if (!storeConfig) {
                return null
            }
            def cfgAt = storeConfig.configurationAt('configuration')
            S3Profile profile = profileMapper.processConfig(cfgAt) as S3Profile
            if (profile) {
                profile.setProfileId(storeId)
            }
            return profile
        } catch (Exception e) {
            LOG.debug('[uigoodies DevContentOps] profileFromConfigurationMapper failed for {}: {}', storeId, e.message)
            return null
        }
    }

    private static S3Profile buildS3ProfileFromMap(Map store) {
        Map cfg = store?.s3Configuration as Map ?: [:]
        S3Profile profile = new S3Profile()
        String accessKey = staticS3Credential(cfg.accessKey)
        String secretKey = staticS3Credential(cfg.secretKey)
        if (accessKey && secretKey) {
            profile.setAccessKey(accessKey)
            profile.setSecretKey(secretKey)
        }
        profile.setRegion(DevContentOpsSupport.jsonSafeText(cfg.region) ?: 'us-east-1')
        String endpoint = DevContentOpsSupport.jsonSafeText(cfg.endpoint)
        if (endpoint) {
            profile.setEndpoint(endpoint)
        }
        profile.setPathStyleAccessEnabled(Boolean.TRUE == cfg.pathStyleAccess)
        return profile
    }

    private static String staticS3Credential(def value) {
        String text = DevContentOpsSupport.jsonSafeText(value)
        if (!text || text.contains('${')) {
            return null
        }
        return text
    }

    private static Map openS3ClientHandle(def applicationContext, String siteId, Map store) {
        def factory = applicationContext?.get('crafter.s3ClientFactory')
        S3Profile profile = buildS3Profile(applicationContext, siteId, store)
        if (factory) {
            try {
                return [client: factory.getClient(profile) as S3Client, cached: true]
            } catch (Exception e) {
                LOG.debug('[uigoodies DevContentOps] s3ClientFactory failed, falling back to S3Utils: {}', e.message)
            }
        }
        return [client: S3Utils.createClient(profile), cached: false]
    }

    static void releaseS3ClientHandle(Map handle) {
        if (!handle || Boolean.TRUE == handle.cached || !handle.client) {
            return
        }
        try {
            (handle.client as S3Client).close()
        } catch (Exception ignored) {
        }
    }

    private static S3Client clientFromHandle(Map handle) {
        return handle?.client as S3Client
    }

    private static Map resolveVersioningSupport(def applicationContext, String siteId, Map store, Map envConfig = null) {
        if ((store.type as String) != 's3BlobStore') {
            return [versioningSupported: false]
        }

        List<String> buckets = resolveBucketNames(store, envConfig)
        if (buckets.isEmpty()) {
            return [
                versioningSupported: false,
                versioningNote: 'No S3 buckets are configured for this blob store, so version history is unavailable.'
            ]
        }

        Map clientHandle = null
        try {
            clientHandle = openS3ClientHandle(applicationContext, siteId, store)
            S3Client client = clientFromHandle(clientHandle)
            if (!client) {
                LOG.info(
                    '[uigoodies DevContentOps] S3 client unavailable for versioning check on store {} (version history remains enabled)',
                    store.id
                )
                return [versioningSupported: true]
            }

            List<String> disabledBuckets = []
            List<String> permissionDeniedBuckets = []
            List<String> notFoundBuckets = []
            List<String> unresolvedBuckets = []
            int verifiedEnabledCount = 0
            buckets.each { String bucket ->
                if (bucket.contains('${')) {
                    unresolvedBuckets.add(bucket)
                    return
                }
                try {
                    def response = client.getBucketVersioning(
                        GetBucketVersioningRequest.builder().bucket(bucket).build()
                    )
                    BucketVersioningStatus status = response?.status()
                    if (status == null || status == BucketVersioningStatus.OFF) {
                        disabledBuckets.add("${bucket} (OFF)")
                    } else if (status == BucketVersioningStatus.SUSPENDED) {
                        disabledBuckets.add("${bucket} (SUSPENDED)")
                    } else if (status == BucketVersioningStatus.ENABLED) {
                        verifiedEnabledCount++
                    } else {
                        disabledBuckets.add("${bucket} (${status})")
                    }
                } catch (Exception bucketError) {
                    if (isS3AccessDenied(bucketError)) {
                        permissionDeniedBuckets.add(bucket)
                    } else if (isS3BucketNotFound(bucketError) || isS3RegionOrEndpointMismatch(bucketError)) {
                        notFoundBuckets.add(bucket)
                    } else {
                        LOG.debug(
                            '[uigoodies DevContentOps] GetBucketVersioning failed for bucket {} in store {}: {}',
                            bucket,
                            store.id,
                            DevContentOpsSupport.jsonSafeText(bucketError.message)
                        )
                        unresolvedBuckets.add(bucket)
                    }
                }
            }

            if (!disabledBuckets.isEmpty()) {
                return [
                    versioningSupported: false,
                    versioningNote: "S3 bucket versioning is not enabled for: ${disabledBuckets.join(', ')}. " +
                        'Enable versioning on the bucket in MinIO or S3 to use version history, deleted-blob restore, and version previews.'
                ]
            }

            if (verifiedEnabledCount > 0) {
                return [versioningSupported: true]
            }

            if (!permissionDeniedBuckets.isEmpty()) {
                LOG.info(
                    '[uigoodies DevContentOps] Skipping versioning advisory for store {}: GetBucketVersioning not permitted for {} (version history remains enabled)',
                    store.id,
                    permissionDeniedBuckets.join(', ')
                )
                return [versioningSupported: true]
            }

            if (!notFoundBuckets.isEmpty()) {
                return [
                    versioningSupported: true,
                    versioningNote: versioningUnverifiedNote(notFoundBuckets, 'not_found')
                ]
            }

            if (!unresolvedBuckets.isEmpty()) {
                LOG.info(
                    '[uigoodies DevContentOps] Could not verify bucket versioning for store {} buckets {} (version history remains enabled)',
                    store.id,
                    unresolvedBuckets.join(', ')
                )
            }

            return [versioningSupported: true]
        } catch (Exception e) {
            LOG.info(
                '[uigoodies DevContentOps] GetBucketVersioning check skipped for {}: {}',
                store.id,
                DevContentOpsSupport.jsonSafeText(e.message)
            )
            return [versioningSupported: true]
        } finally {
            releaseS3ClientHandle(clientHandle)
        }
    }

    private static boolean isS3AccessDenied(Exception e) {
        if (e instanceof S3Exception) {
            return ((S3Exception) e).statusCode() == 403
        }
        String msg = DevContentOpsSupport.jsonSafeText(e?.message)?.toLowerCase() ?: ''
        return msg.contains('not authorized') ||
            msg.contains('access denied') ||
            msg.contains('accessdenied') ||
            msg.contains('status code: 403')
    }

    private static boolean isS3BucketNotFound(Exception e) {
        if (e instanceof S3Exception) {
            return ((S3Exception) e).statusCode() == 404
        }
        String msg = DevContentOpsSupport.jsonSafeText(e?.message)?.toLowerCase() ?: ''
        return msg.contains('does not exist') ||
            msg.contains('nosuchbucket') ||
            msg.contains('no such bucket') ||
            msg.contains('status code: 404') ||
            (msg.contains('404') && msg.contains('bucket'))
    }

    private static boolean isS3RegionOrEndpointMismatch(Exception e) {
        if (e instanceof S3Exception) {
            int code = ((S3Exception) e).statusCode()
            return code == 301 || code == 307 || code == 400
        }
        String msg = DevContentOpsSupport.jsonSafeText(e?.message)?.toLowerCase() ?: ''
        return msg.contains('permanentredirect') ||
            msg.contains('temporaryredirect') ||
            msg.contains('authorizationheadermalformed') ||
            msg.contains('must be addressed using the specified endpoint') ||
            msg.contains('the bucket you are attempting to access must be addressed')
    }

    private static String versioningUnverifiedNote(List<String> buckets, String reason = 'not_found') {
        String bucketList = buckets?.join(', ') ?: 'configured bucket(s)'
        if ('not_found' == reason) {
            return "Could not reach S3 bucket(s) ${bucketList} from Studio. " +
                'Check mappings.storeTarget, region, and endpoint in blob-stores-config.xml, and ensure the Studio IAM role can access the bucket.'
        }
        return "Could not verify bucket versioning for ${bucketList}."
    }

    private static Map ensureSandboxBlobPointer(
        def applicationContext,
        String siteId,
        String storeId,
        String assetPath,
        boolean forceStudioRegistration = false
    ) {
        String normalizedPath = normalizeSitePath(assetPath)
        String pointerPath = toRepoPointerPath(normalizedPath)
        def helper = DevContentOpsSupport.gitHelper(applicationContext)
        def contentService = applicationContext?.get('cstudioContentService')
        boolean pointerExists = helper && sandboxPointerExists(helper, siteId, pointerPath)
        boolean itemExists = false
        if (contentService) {
            try {
                itemExists = Boolean.TRUE == contentService.contentExists(siteId, normalizedPath)
            } catch (Exception ignored) {
            }
        }

        if (!forceStudioRegistration && pointerExists && itemExists) {
            return [pointerRestored: false, pointerPath: pointerPath]
        }

        StudioBlobStore store = resolveStoreById(applicationContext, siteId, storeId)
        if (!store || !contentService) {
            return [
                pointerRestored: false,
                pointerPath: pointerPath,
                pointerError: 'Blob store or Studio content service is not available'
            ]
        }

        java.io.InputStream stream = null
        try {
            stream = store.getContent(siteId, normalizedPath, true)
            if (!stream) {
                return [
                    pointerRestored: false,
                    pointerPath: pointerPath,
                    pointerError: 'Blob binary is not available in the store'
                ]
            }

            Map<String, String> parts = CrossSiteContentCopySupport.splitPathParts(normalizedPath)
            boolean existed = itemExists
            def writeResult = contentService.writeContentAsset(
                siteId,
                parts.parent,
                parts.fileName,
                stream,
                'false',
                '',
                '',
                'true',
                existed ? 'true' : 'false',
                'true',
                null
            )
            if (Boolean.TRUE == writeResult?.success) {
                return [
                    pointerRestored: true,
                    pointerPath: pointerPath,
                    message: "Registered sandbox asset ${normalizedPath} in Studio"
                ]
            }

            String writeError = DevContentOpsSupport.jsonSafeText(writeResult?.message)
            if (!writeError) {
                writeError = DevContentOpsSupport.jsonSafeText(writeResult?.error?.message)
            }
            return [
                pointerRestored: false,
                pointerPath: pointerPath,
                pointerError: writeError ?: 'Studio asset write failed'
            ]
        } catch (Exception e) {
            LOG.warn('[uigoodies DevContentOps] ensureSandboxBlobPointer failed for {} {}: {}',
                siteId, normalizedPath, e.message)
            return [
                pointerRestored: false,
                pointerPath: pointerPath,
                pointerError: DevContentOpsSupport.jsonSafeText(e.message)
            ]
        } finally {
            try {
                stream?.close()
            } catch (Exception ignored) {
            }
        }
    }

    private static String pointerResultMessage(Map pointerResult) {
        if (!pointerResult) {
            return ''
        }
        if (Boolean.TRUE == pointerResult.pointerRestored) {
            return ' Registered the asset in Studio (sidebar and sandbox pointer).'
        }
        String pointerError = DevContentOpsSupport.jsonSafeText(pointerResult.pointerError)
        if (pointerError) {
            return " Warning: asset was not registered in Studio (${pointerError})."
        }
        return ''
    }

    /**
     * S3 null version IDs (objects uploaded before versioning) are represented as the literal string {@code null} in API calls.
     */
    private static Map normalizeS3VersionId(def rawVersionId) {
        String text = ''
        if (rawVersionId != null) {
            text = DevContentOpsSupport.jsonSafeText(String.valueOf(rawVersionId))
        }
        boolean legacyNull = !text || text.equalsIgnoreCase('null')
        if (legacyNull) {
            return [
                apiVersionId: 'null',
                versionLabel: 'Original (pre-versioning)',
                legacyNullVersion: true
            ]
        }
        return [
            apiVersionId: text,
            versionLabel: text,
            legacyNullVersion: false
        ]
    }

    private static String requireS3VersionIdForRequest(String versionId) {
        if (versionId == null) {
            return null
        }
        String trimmed = DevContentOpsSupport.jsonSafeText(versionId)
        if (!trimmed) {
            return null
        }
        return normalizeS3VersionId(versionId).apiVersionId as String
    }

    private static String buildBlobVersionStreamUrl(
        String siteId,
        String storeId,
        String assetPath,
        String versionId,
        String target
    ) {
        String base = '/studio/api/2/plugin/script/plugins/org/rd/plugin/uigoodies/dev-content-ops-git'
        String query = 'siteId=' + java.net.URLEncoder.encode(siteId, 'UTF-8') +
            '&action=blobStoreVersionContent' +
            '&storeId=' + java.net.URLEncoder.encode(storeId, 'UTF-8') +
            '&path=' + java.net.URLEncoder.encode(assetPath, 'UTF-8') +
            '&versionId=' + java.net.URLEncoder.encode(versionId, 'UTF-8') +
            '&target=' + java.net.URLEncoder.encode(target, 'UTF-8')
        return base + '?' + query
    }

    private static String contentTypeForPath(String path) {
        String normalized = DevContentOpsSupport.jsonSafeText(path)?.toLowerCase()
        if (!normalized) {
            return 'application/octet-stream'
        }
        if (normalized.endsWith('.png')) {
            return 'image/png'
        }
        if (normalized.endsWith('.jpg') || normalized.endsWith('.jpeg')) {
            return 'image/jpeg'
        }
        if (normalized.endsWith('.gif')) {
            return 'image/gif'
        }
        if (normalized.endsWith('.webp')) {
            return 'image/webp'
        }
        if (normalized.endsWith('.svg')) {
            return 'image/svg+xml'
        }
        if (normalized.endsWith('.pdf')) {
            return 'application/pdf'
        }
        if (normalized.endsWith('.mp4')) {
            return 'video/mp4'
        }
        if (normalized.endsWith('.webm')) {
            return 'video/webm'
        }
        if (normalized.endsWith('.mp3')) {
            return 'audio/mpeg'
        }
        return 'application/octet-stream'
    }

    private static boolean isInlinePreviewType(String contentType) {
        String type = DevContentOpsSupport.jsonSafeText(contentType)?.toLowerCase()
        return type?.startsWith('image/') || type == 'application/pdf' || type?.startsWith('video/') || type?.startsWith('audio/')
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
