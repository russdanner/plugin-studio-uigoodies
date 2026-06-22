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

try {
    def siteResolution = DevContentOpsSupport.resolveRequestSiteId(params.siteId as String)
    if (siteResolution.error) {
        response.status = 400
        return siteResolution.error
    }
    def siteId = siteResolution.siteId as String
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
            return DevContentOpsSupport.fetchRepoStatus(
                helper, contentRepo, siteId, branch, sitesSvc, applicationContext
            )

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
                logRepo, sitesSvc, processedDao, siteId, branchName, skip, limit, since, until, order
            )

        case 'commit':
            def commitId = DevContentOpsSupport.jsonSafeText(params.commitId ?: '')
            if (!commitId) {
                response.status = 400
                return DevContentOpsSupport.errorMap('commitId is required')
            }
            def detailRepo = DevContentOpsSupport.openSandboxRepo(helper, siteId)
            return DevContentOpsSupport.fetchCommitDetail(helper, detailRepo, sitesSvc, processedDao, siteId, commitId)

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
            return DevContentOpsWorkTreeSupport.fetchWorkTree(
                helper, contentRepo, applicationContext, siteId, branch
            )

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
            return DevContentOpsSupport.withSiteId(
                siteId,
                DevContentOpsBlobStoreSupport.fetchBlobStoreOverview(
                    applicationContext, siteId, helper, contentRepo
                ) as Map
            )

        case 'blobStoreChildren':
            def storeId = DevContentOpsSupport.jsonSafeText(params.storeId ?: '')
            if (!storeId) {
                response.status = 400
                return DevContentOpsSupport.errorMap('storeId is required')
            }
            def parentPath = DevContentOpsSupport.jsonSafeText(params.path ?: '')
            return DevContentOpsSupport.withSiteId(
                siteId,
                DevContentOpsBlobStoreSupport.listBlobStoreChildren(
                    applicationContext, helper, contentRepo, siteId, storeId, parentPath
                ) as Map
            )

        default:
            response.status = 400
            return DevContentOpsSupport.errorMap("Unknown action: ${action}")
    }
} catch (Exception e) {
    response.status = 500
    return DevContentOpsSupport.failureFromThrowable(e, 'dev-content-ops-git GET failed')
}
