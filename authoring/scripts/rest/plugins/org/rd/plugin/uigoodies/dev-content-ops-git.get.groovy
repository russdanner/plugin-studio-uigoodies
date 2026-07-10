/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 *
 * GET /studio/api/2/plugin/script/plugins/org/rd/plugin/uigoodies/dev-content-ops-git?siteId=<site>&action=<action>
 *
 * Actions: status | branches | log | commit | file | diff | patch
 */

import plugins.org.rd.plugin.uigoodies.DevContentOpsSupport
import plugins.org.rd.plugin.uigoodies.DevContentOpsRepoHealthSupport
import plugins.org.rd.plugin.uigoodies.DevContentOpsRefsSupport
import plugins.org.rd.plugin.uigoodies.DevContentOpsWorkTreeSupport
import plugins.org.rd.plugin.uigoodies.DevContentOpsBlobStoreSupport
import plugins.org.rd.plugin.uigoodies.DevContentOpsPublishCompareSupport

try {
    def siteResolution = DevContentOpsSupport.resolveRequestSiteId(params.siteId as String)
    if (siteResolution.error) {
        response.status = 400
        return siteResolution.error
    }
    def studioSiteId = siteResolution.siteId as String
    def siteId = DevContentOpsSupport.resolveOperationSiteId(studioSiteId, params)
    def action = DevContentOpsSupport.jsonSafeText(params.action ?: 'status')

    def helper = DevContentOpsSupport.gitHelper(applicationContext)
    def contentRepo = DevContentOpsSupport.contentRepository(applicationContext)
    def sitesSvc = DevContentOpsSupport.sitesService(applicationContext)
    def processedDao = DevContentOpsSupport.processedCommitsDao(applicationContext)
    if (!helper || !contentRepo) {
        response.status = 500
        return DevContentOpsSupport.errorMap('Git services are not available in Studio')
    }

    def branch = DevContentOpsSupport.jsonSafeText(params.branch ?: '')

    switch (action) {
        case 'status':
            try {
                return DevContentOpsSupport.withSiteId(
                    siteId,
                    DevContentOpsSupport.fetchRepoStatus(
                        helper, contentRepo, siteId, branch, sitesSvc, applicationContext
                    ) as Map
                )
            } catch (Throwable t) {
                return DevContentOpsSupport.withSiteId(
                    siteId,
                    DevContentOpsSupport.failureFromThrowable(t, 'status failed')
                )
            }

        case 'branches':
            def repo = DevContentOpsSupport.openSandboxRepo(helper, siteId)
            return [branches: DevContentOpsSupport.listBranches(repo)]

        case 'refs':
            return DevContentOpsRefsSupport.listRefs(helper, sitesSvc, siteId)

        case 'log':
            int skip = (params.skip ?: '0').toString().isInteger() ? params.skip.toInteger() : 0
            int limit = (params.limit ?: '50').toString().isInteger() ? params.limit.toInteger() : 50
            if (limit > 200) {
                limit = 200
            }
            Long since = null
            Long until = null
            if (params.since) {
                try {
                    since = Long.valueOf(params.since.toString())
                } catch (NumberFormatException e) {
                    response.status = 400
                    return DevContentOpsSupport.errorMap('since must be a valid timestamp')
                }
            }
            if (params.until) {
                try {
                    until = Long.valueOf(params.until.toString())
                } catch (NumberFormatException e) {
                    response.status = 400
                    return DevContentOpsSupport.errorMap('until must be a valid timestamp')
                }
            }
            def branchName = branch
            if (!branchName && sitesSvc) {
                try {
                    def site = sitesSvc.getSite(siteId)
                    branchName = DevContentOpsSupport.jsonSafeText(site?.sandboxBranch) ?: 'master'
                } catch (Exception ignored) {
                    branchName = 'master'
                }
            }
            if (!branchName) {
                branchName = 'master'
            }
            def order = DevContentOpsSupport.jsonSafeText(params.order ?: 'desc')
            def logRepo = DevContentOpsSupport.openSandboxRepo(helper, siteId)
            return DevContentOpsSupport.fetchGitLog(
                logRepo, sitesSvc, processedDao, siteId, branchName, skip, limit, since, until, order, contentRepo
            )

        case 'commit':
            def commitId = DevContentOpsSupport.jsonSafeText(params.commitId ?: '')
            if (!commitId) {
                response.status = 400
                return DevContentOpsSupport.errorMap('commitId is required')
            }
            def detailRepo = DevContentOpsSupport.openSandboxRepo(helper, siteId)
            return DevContentOpsSupport.fetchCommitDetail(helper, detailRepo, sitesSvc, processedDao, siteId, commitId, contentRepo)

        case 'commitFiles':
            def commitId = DevContentOpsSupport.jsonSafeText(params.commitId ?: '')
            if (!commitId) {
                response.status = 400
                return DevContentOpsSupport.errorMap('commitId is required')
            }
            int fileSkip = (params.skip ?: '0').toString().isInteger() ? params.skip.toInteger() : 0
            int fileLimit = (params.limit ?: '25').toString().isInteger() ? params.limit.toInteger() : 25
            if (fileLimit > 100) {
                fileLimit = 100
            }
            def filesRepo = DevContentOpsSupport.openSandboxRepo(helper, siteId)
            return DevContentOpsSupport.fetchCommitFiles(filesRepo, commitId, fileSkip, fileLimit)

        case 'file':
            def commitId = DevContentOpsSupport.jsonSafeText(params.commitId ?: '')
            def path = DevContentOpsSupport.jsonSafeText(params.path ?: '')
            if (!commitId || !path) {
                response.status = 400
                return DevContentOpsSupport.errorMap('commitId and path are required')
            }
            def fileRepo = DevContentOpsSupport.openSandboxRepo(helper, siteId)
            return DevContentOpsSupport.fetchFileContent(fileRepo, commitId, path)

        case 'diff':
            def fromRef = DevContentOpsSupport.jsonSafeText(params.from ?: '')
            def toRef = DevContentOpsSupport.jsonSafeText(params.to ?: '')
            if (!fromRef || !toRef) {
                response.status = 400
                return DevContentOpsSupport.errorMap('from and to refs are required')
            }
            def diffRepo = DevContentOpsSupport.openSandboxRepo(helper, siteId)
            def pathFilter = DevContentOpsSupport.jsonSafeText(params.path ?: '')
            return DevContentOpsSupport.fetchDiff(diffRepo, fromRef, toRef, pathFilter)

        case 'patch':
            def fromCommit = DevContentOpsSupport.jsonSafeText(params.from ?: '')
            def toCommit = DevContentOpsSupport.jsonSafeText(params.to ?: 'HEAD')
            def patchRepo = DevContentOpsSupport.openSandboxRepo(helper, siteId)
            return DevContentOpsSupport.createFormatPatch(patchRepo, fromCommit, toCommit)

        case 'repoHealth':
            return DevContentOpsSupport.withSiteId(
                siteId,
                DevContentOpsRepoHealthSupport.analyzeRepoHealth(helper, siteId, applicationContext) as Map
            )

        case 'repoHealthStream':
            response.contentType = 'application/x-ndjson'
            response.characterEncoding = 'UTF-8'
            response.setHeader('Cache-Control', 'no-cache, no-transform')
            response.setHeader('Connection', 'keep-alive')
            response.setHeader('X-Accel-Buffering', 'no')
            response.flushBuffer()

            PrintWriter ndjsonWriter = response.writer
            def sendNdjson = { Map payload ->
                ndjsonWriter.println(groovy.json.JsonOutput.toJson(payload))
                ndjsonWriter.flush()
                try {
                    response.flushBuffer()
                } catch (Exception ignored) {
                }
            }

            def streamProgress = { String phase, String message, int percent ->
                sendNdjson([
                    type: 'progress',
                    phase: DevContentOpsSupport.jsonSafeText(phase),
                    message: DevContentOpsSupport.jsonSafeText(message),
                    percent: percent
                ])
            }

            try {
                Map result = DevContentOpsRepoHealthSupport.analyzeRepoHealth(
                    helper,
                    siteId,
                    applicationContext,
                    streamProgress
                ) as Map

                if (result.success) {
                    sendNdjson([type: 'result', report: DevContentOpsSupport.withSiteId(siteId, result)])
                } else {
                    sendNdjson([
                        type: 'error',
                        error: DevContentOpsSupport.jsonSafeText(result.error ?: result.message ?: 'Analysis failed')
                    ])
                }
            } catch (Exception streamEx) {
                sendNdjson([
                    type: 'error',
                    error: DevContentOpsSupport.jsonSafeText(streamEx.message ?: 'Analysis failed')
                ])
            }

            sendNdjson([type: 'bye'])
            return null

        case 'workTree':
            try {
                return DevContentOpsSupport.withSiteId(
                    siteId,
                    DevContentOpsWorkTreeSupport.fetchWorkTree(
                        helper, contentRepo, applicationContext, siteId, branch
                    ) as Map
                )
            } catch (Throwable t) {
                return DevContentOpsSupport.withSiteId(
                    siteId,
                    DevContentOpsSupport.failureFromThrowable(t, 'workTree failed')
                )
            }

        case 'workTreeDiff':
            def path = DevContentOpsSupport.jsonSafeText(params.path ?: '')
            if (!path) {
                response.status = 400
                return DevContentOpsSupport.errorMap('path is required')
            }
            def diffMode = DevContentOpsSupport.jsonSafeText(params.mode ?: 'unstaged')
            def workTreeRepo = DevContentOpsSupport.openSandboxRepo(helper, siteId)
            return DevContentOpsWorkTreeSupport.fetchWorkTreeDiff(workTreeRepo, path, diffMode)

        case 'blobStores':
            try {
                return DevContentOpsSupport.withSiteId(
                    siteId,
                    DevContentOpsBlobStoreSupport.fetchBlobStoreOverview(
                        applicationContext, siteId, helper, contentRepo
                    ) as Map
                )
            } catch (Throwable t) {
                return DevContentOpsSupport.withSiteId(
                    siteId,
                    DevContentOpsSupport.failureFromThrowable(t, 'blobStores failed')
                )
            }

        case 'blobStoreChildren':
            def storeId = DevContentOpsSupport.jsonSafeText(params.storeId ?: '')
            if (!storeId) {
                response.status = 400
                return DevContentOpsSupport.errorMap('storeId is required')
            }
            def parentPath = DevContentOpsSupport.jsonSafeText(params.path ?: '')
            try {
                return DevContentOpsSupport.withSiteId(
                    siteId,
                    DevContentOpsBlobStoreSupport.listBlobStoreChildren(
                        applicationContext, helper, contentRepo, siteId, storeId, parentPath
                    ) as Map
                )
            } catch (Throwable t) {
                return DevContentOpsSupport.withSiteId(
                    siteId,
                    DevContentOpsSupport.failureFromThrowable(t, 'blobStoreChildren failed')
                )
            }

        case 'blobStoreVersions':
            def versionStoreId = DevContentOpsSupport.jsonSafeText(params.storeId ?: '')
            def versionPath = DevContentOpsSupport.jsonSafeText(params.path ?: '')
            def versionTarget = DevContentOpsSupport.jsonSafeText(params.target ?: 'preview')
            if (!versionStoreId) {
                response.status = 400
                return DevContentOpsSupport.errorMap('storeId is required')
            }
            if (!versionPath) {
                response.status = 400
                return DevContentOpsSupport.errorMap('path is required')
            }
            return DevContentOpsSupport.withSiteId(
                siteId,
                DevContentOpsBlobStoreSupport.listBlobVersions(
                    applicationContext, contentRepo, siteId, versionStoreId, versionPath, versionTarget
                ) as Map
            )

        case 'blobStoreDeleted':
            def deletedStoreId = DevContentOpsSupport.jsonSafeText(params.storeId ?: '')
            def deletedTarget = DevContentOpsSupport.jsonSafeText(params.target ?: 'preview')
            def deletedLimit = DevContentOpsSupport.toLong(params.limit, 200L) as int
            if (!deletedStoreId) {
                response.status = 400
                return DevContentOpsSupport.errorMap('storeId is required')
            }
            return DevContentOpsSupport.withSiteId(
                siteId,
                DevContentOpsBlobStoreSupport.listDeletedBlobs(
                    applicationContext, contentRepo, siteId, deletedStoreId, deletedTarget, deletedLimit
                ) as Map
            )

        case 'blobStoreVersionPreview':
            def previewStoreId = DevContentOpsSupport.jsonSafeText(params.storeId ?: '')
            def previewPath = DevContentOpsSupport.jsonSafeText(params.path ?: '')
            def previewVersionId = DevContentOpsSupport.jsonSafeText(params.versionId ?: '')
            def previewTarget = DevContentOpsSupport.jsonSafeText(params.target ?: 'preview')
            if (!previewStoreId) {
                response.status = 400
                return DevContentOpsSupport.errorMap('storeId is required')
            }
            if (!previewPath) {
                response.status = 400
                return DevContentOpsSupport.errorMap('path is required')
            }
            if (!previewVersionId) {
                response.status = 400
                return DevContentOpsSupport.errorMap('versionId is required')
            }
            return DevContentOpsSupport.withSiteId(
                siteId,
                DevContentOpsBlobStoreSupport.getBlobVersionPreviewUrl(
                    applicationContext,
                    contentRepo,
                    siteId,
                    previewStoreId,
                    previewPath,
                    previewVersionId,
                    previewTarget
                ) as Map
            )

        case 'publishCompareOverview':
            try {
                return DevContentOpsSupport.withSiteId(
                    siteId,
                    DevContentOpsPublishCompareSupport.fetchOverview(
                        helper, contentRepo, applicationContext, sitesSvc, siteId
                    ) as Map
                )
            } catch (Throwable t) {
                return DevContentOpsSupport.withSiteId(
                    siteId,
                    DevContentOpsSupport.failureFromThrowable(t, 'publishCompareOverview failed')
                )
            }

        case 'publishCompare':
            int compareSkip = (params.skip ?: '0').toString().isInteger() ? params.skip.toInteger() : 0
            int compareLimit = (params.limit ?: '50').toString().isInteger() ? params.limit.toInteger() : 50
            def compareTarget = DevContentOpsSupport.jsonSafeText(params.target ?: '')
            def comparePathPrefix = DevContentOpsSupport.jsonSafeText(params.pathPrefix ?: '')
            def compareQuery = DevContentOpsSupport.jsonSafeText(params.query ?: '')
            boolean compareHideNoDiff = DevContentOpsSupport.toBoolean(params.hideNoDiff, true)
            try {
                return DevContentOpsSupport.withSiteId(
                    siteId,
                    DevContentOpsPublishCompareSupport.compare(
                        helper,
                        contentRepo,
                        sitesSvc,
                        siteId,
                        [
                            target: compareTarget,
                            pathPrefix: comparePathPrefix,
                            query: compareQuery,
                            hideNoDiff: compareHideNoDiff,
                            skip: compareSkip,
                            limit: compareLimit
                        ]
                    ) as Map
                )
            } catch (Throwable t) {
                return DevContentOpsSupport.withSiteId(
                    siteId,
                    DevContentOpsSupport.failureFromThrowable(t, 'publishCompare failed')
                )
            }

        case 'publishCompareDiff':
            def diffPath = DevContentOpsSupport.jsonSafeText(params.path ?: '')
            if (!diffPath) {
                response.status = 400
                return DevContentOpsSupport.errorMap('path is required')
            }
            def diffTarget = DevContentOpsSupport.jsonSafeText(params.target ?: '')
            try {
                return DevContentOpsSupport.withSiteId(
                    siteId,
                    DevContentOpsPublishCompareSupport.fetchFileDiff(
                        helper, contentRepo, sitesSvc, siteId, diffPath, diffTarget
                    ) as Map
                )
            } catch (Throwable t) {
                return DevContentOpsSupport.withSiteId(
                    siteId,
                    DevContentOpsSupport.failureFromThrowable(t, 'publishCompareDiff failed')
                )
            }

        case 'blobStoreVersionContent':
            def contentStoreId = DevContentOpsSupport.jsonSafeText(params.storeId ?: '')
            def contentPath = DevContentOpsSupport.jsonSafeText(params.path ?: '')
            def contentVersionId = DevContentOpsSupport.jsonSafeText(params.versionId ?: '')
            def contentTarget = DevContentOpsSupport.jsonSafeText(params.target ?: 'preview')
            if (!contentStoreId) {
                response.status = 400
                return DevContentOpsSupport.errorMap('storeId is required')
            }
            if (!contentPath) {
                response.status = 400
                return DevContentOpsSupport.errorMap('path is required')
            }
            if (!contentVersionId) {
                response.status = 400
                return DevContentOpsSupport.errorMap('versionId is required')
            }

            Map openResult = DevContentOpsBlobStoreSupport.openBlobVersionContent(
                applicationContext,
                contentRepo,
                siteId,
                contentStoreId,
                contentPath,
                contentVersionId,
                contentTarget
            ) as Map
            if (openResult.error) {
                response.status = 400
                return openResult
            }
            if (!Boolean.TRUE.equals(openResult.success)) {
                response.status = 500
                return DevContentOpsSupport.errorMap('Failed to open blob version')
            }

            def objectStream = openResult.inputStream
            def clientHandle = openResult.s3ClientHandle as Map
            try {
                String contentType = DevContentOpsSupport.jsonSafeText(openResult.contentType) ?: 'application/octet-stream'
                String fileName = DevContentOpsSupport.jsonSafeText(openResult.fileName) ?: 'blob'
                response.status = 200
                response.contentType = contentType
                response.setHeader('Cache-Control', 'private, max-age=60')
                response.setHeader('Content-Disposition', 'inline; filename="' + fileName.replace('"', '') + '"')

                java.io.OutputStream out = response.outputStream
                byte[] buffer = new byte[8192]
                int read
                while ((read = objectStream.read(buffer)) != -1) {
                    out.write(buffer, 0, read)
                }
                out.flush()
                response.flushBuffer()
            } catch (Exception e) {
                if (!response.isCommitted()) {
                    response.reset()
                    response.status = 500
                    return DevContentOpsSupport.errorMap('Failed to stream blob version: ' + e.message)
                }
            } finally {
                try {
                    objectStream?.close()
                } catch (Exception ignored) {
                }
                DevContentOpsBlobStoreSupport.releaseS3ClientHandle(clientHandle)
            }
            return null

        default:
            response.status = 400
            return DevContentOpsSupport.errorMap("Unknown action: ${action}")
    }
} catch (Throwable t) {
    response.status = 500
    return DevContentOpsSupport.failureFromThrowable(t, 'dev-content-ops-git GET failed')
}
