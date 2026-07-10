/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 *
 * POST /studio/api/2/plugin/script/plugins/org/rd/plugin/uigoodies/dev-content-ops-git?siteId=<site>
 * Body: { "action": "...", ... }
 */

import plugins.org.rd.plugin.uigoodies.DevContentOpsSupport
import plugins.org.rd.plugin.uigoodies.DevContentOpsRepoHealthSupport
import plugins.org.rd.plugin.uigoodies.DevContentOpsItemStateSupport
import plugins.org.rd.plugin.uigoodies.DevContentOpsRefsSupport
import plugins.org.rd.plugin.uigoodies.DevContentOpsWorkTreeSupport
import plugins.org.rd.plugin.uigoodies.DevContentOpsBlobStoreSupport

try {
    def siteResolution = DevContentOpsSupport.resolveRequestSiteId(params.siteId as String)
    if (siteResolution.error) {
        response.status = 400
        return siteResolution.error
    }
    def studioSiteId = siteResolution.siteId as String

    def payload = DevContentOpsSupport.readJsonBody(request)
    if (payload == null) {
        response.status = 400
        return DevContentOpsSupport.errorMap('Invalid JSON body')
    }

    def bodySiteResolution = DevContentOpsSupport.resolveRequestSiteId(studioSiteId, payload as Map)
    if (bodySiteResolution.error) {
        response.status = 400
        return bodySiteResolution.error
    }

    def siteId = DevContentOpsSupport.resolveOperationSiteId(studioSiteId, params, payload as Map)
    def action = DevContentOpsSupport.jsonSafeText(payload.action ?: '')
    def helper = DevContentOpsSupport.gitHelper(applicationContext)
    def contentRepo = DevContentOpsSupport.contentRepository(applicationContext)
    def sitesSvc = DevContentOpsSupport.sitesService(applicationContext)
    if (!helper || !contentRepo) {
        response.status = 500
        return DevContentOpsSupport.errorMap('Git services are not available in Studio')
    }

    def repo = DevContentOpsSupport.openSandboxRepo(helper, siteId)

    switch (action) {
        case 'applyPatch':
            def patch = payload.patch?.toString() ?: ''
            if (!patch.trim()) {
                response.status = 400
                return DevContentOpsSupport.errorMap('patch text is required')
            }
            return DevContentOpsSupport.applyPatch(repo, patch)

        case 'setProcessedCommit':
            def commitId = DevContentOpsSupport.jsonSafeText(payload.commitId ?: '')
            int batch = 500
            if (payload.batchSize != null) {
                try {
                    batch = payload.batchSize as int
                    if (batch <= 0) {
                        response.status = 400
                        return DevContentOpsSupport.errorMap('batchSize must be positive')
                    }
                } catch (Exception e) {
                    response.status = 400
                    return DevContentOpsSupport.errorMap('batchSize must be a valid integer')
                }
            }
            if (!commitId) {
                response.status = 400
                return DevContentOpsSupport.errorMap('commitId is required')
            }
            return DevContentOpsSupport.setProcessedCommitAndSync(sitesSvc, applicationContext, siteId, commitId, batch)

        case 'revertToCommit':
            def commitId = DevContentOpsSupport.jsonSafeText(payload.commitId ?: '')
            if (!commitId) {
                response.status = 400
                return DevContentOpsSupport.errorMap('commitId is required')
            }
            return DevContentOpsSupport.revertWorkingTreeToCommit(helper, siteId, repo, commitId)

        case 'resetHead':
            def commitId = DevContentOpsSupport.jsonSafeText(payload.commitId ?: '')
            if (!commitId) {
                response.status = 400
                return DevContentOpsSupport.errorMap('commitId is required')
            }
            // Studio-aware reset: revert working tree first, then hard reset
            def revert = DevContentOpsSupport.revertWorkingTreeToCommit(helper, siteId, repo, commitId)
            if (revert.error) {
                return revert
            }
            def reset = DevContentOpsSupport.resetHeadToCommit(repo, commitId)
            if (!reset.error && sitesSvc) {
                reset.processedCommitUpdate = DevContentOpsSupport.setProcessedCommitAndSync(
                    sitesSvc, applicationContext, siteId, commitId, 500
                )
            }
            return reset

        case 'filterFile':
            def path = DevContentOpsSupport.jsonSafeText(payload.path ?: '')
            if (!path) {
                response.status = 400
                return DevContentOpsSupport.errorMap('path is required')
            }
            def filterResult = DevContentOpsSupport.filterFileFromHistory(helper, applicationContext, siteId, path, [:])
            if (filterResult.success && filterResult.headCommitId && sitesSvc) {
                filterResult.processedCommitUpdate = DevContentOpsSupport.setProcessedCommitAndSync(
                    sitesSvc, applicationContext, siteId, filterResult.headCommitId as String, 500
                )
            }
            return filterResult

        case 'trimHistory':
            def keepCommitId = DevContentOpsSupport.jsonSafeText(payload.keepCommitId ?: '')
            def trim = DevContentOpsSupport.runRepoGarbageCollection(helper, siteId)
            if (!trim.error && keepCommitId) {
                trim.processedCommitUpdate = DevContentOpsSupport.setProcessedCommitAndSync(
                    sitesSvc, applicationContext, siteId, keepCommitId, 500
                )
            }
            return trim

        case 'buildPatch':
            def selections = payload.selections
            if (!selections || !(selections instanceof List)) {
                response.status = 400
                return DevContentOpsSupport.errorMap('selections array is required')
            }
            return DevContentOpsSupport.buildPatchFromSelections(repo, selections as List)

        case 'optimizeRepo':
            def operation = DevContentOpsSupport.jsonSafeText(payload.operation ?: 'gc')
            return DevContentOpsSupport.withSiteId(
                siteId,
                DevContentOpsRepoHealthSupport.optimizeRepo(helper, applicationContext, siteId, operation) as Map
            )

        case 'updateItemStateBits':
            def path = DevContentOpsSupport.jsonSafeText(payload.path ?: '')
            long onMask = DevContentOpsSupport.toLong(payload.onMask, 0L)
            long offMask = DevContentOpsSupport.toLong(payload.offMask, 0L)
            return DevContentOpsSupport.withSiteId(
                siteId,
                DevContentOpsItemStateSupport.updateItemStateBits(applicationContext, siteId, path, onMask, offMask) as Map
            )

        case 'updateItemStateBitsBulk':
            def paths = (payload.paths instanceof List) ? payload.paths as List : []
            long onMaskBulk = DevContentOpsSupport.toLong(payload.onMask, 0L)
            long offMaskBulk = DevContentOpsSupport.toLong(payload.offMask, 0L)
            return DevContentOpsSupport.withSiteId(
                siteId,
                DevContentOpsItemStateSupport.updateItemStateBitsBulk(
                    applicationContext, siteId, paths, onMaskBulk, offMaskBulk
                ) as Map
            )

        case 'createBranch':
            return DevContentOpsSupport.withSiteId(
                siteId,
                DevContentOpsRefsSupport.createBranch(
                    helper,
                    applicationContext,
                    siteId,
                    DevContentOpsSupport.jsonSafeText(payload.name ?: ''),
                    DevContentOpsSupport.jsonSafeText(payload.startPoint ?: ''),
                    DevContentOpsSupport.toBoolean(payload.force, false)
                ) as Map
            )

        case 'createTag':
            return DevContentOpsSupport.withSiteId(
                siteId,
                DevContentOpsRefsSupport.createTag(
                    helper,
                    applicationContext,
                    siteId,
                    DevContentOpsSupport.jsonSafeText(payload.name ?: ''),
                    DevContentOpsSupport.jsonSafeText(payload.commit ?: ''),
                    DevContentOpsSupport.jsonSafeText(payload.message ?: ''),
                    DevContentOpsSupport.toBoolean(payload.annotated, false)
                ) as Map
            )

        case 'deleteBranch':
            return DevContentOpsSupport.withSiteId(
                siteId,
                DevContentOpsRefsSupport.deleteBranch(
                    helper,
                    applicationContext,
                    sitesSvc,
                    siteId,
                    DevContentOpsSupport.jsonSafeText(payload.name ?: ''),
                    DevContentOpsSupport.toBoolean(payload.force, false),
                    DevContentOpsSupport.toBoolean(payload.deleteLocal, true),
                    DevContentOpsSupport.toBoolean(payload.deleteRemote, false),
                    DevContentOpsSupport.jsonSafeText(payload.remote ?: '')
                ) as Map
            )

        case 'deleteTag':
            return DevContentOpsSupport.withSiteId(
                siteId,
                DevContentOpsRefsSupport.deleteTag(
                    helper,
                    applicationContext,
                    siteId,
                    DevContentOpsSupport.jsonSafeText(payload.name ?: ''),
                    DevContentOpsSupport.toBoolean(payload.deleteLocal, true),
                    DevContentOpsSupport.toBoolean(payload.deleteRemote, false),
                    DevContentOpsSupport.jsonSafeText(payload.remote ?: '')
                ) as Map
            )

        case 'workTreeStage':
            return DevContentOpsSupport.withSiteId(
                siteId,
                DevContentOpsWorkTreeSupport.stagePaths(
                    helper,
                    applicationContext,
                    siteId,
                    (payload.paths instanceof List) ? payload.paths as List : [],
                    DevContentOpsSupport.toBoolean(payload.all, false)
                ) as Map
            )

        case 'workTreeUnstage':
            return DevContentOpsSupport.withSiteId(
                siteId,
                DevContentOpsWorkTreeSupport.unstagePaths(
                    helper,
                    applicationContext,
                    siteId,
                    (payload.paths instanceof List) ? payload.paths as List : [],
                    DevContentOpsSupport.toBoolean(payload.all, false)
                ) as Map
            )

        case 'workTreeDiscard':
            return DevContentOpsSupport.withSiteId(
                siteId,
                DevContentOpsWorkTreeSupport.discardPaths(
                    helper,
                    applicationContext,
                    siteId,
                    (payload.paths instanceof List) ? payload.paths as List : [],
                    DevContentOpsSupport.toBoolean(payload.all, false)
                ) as Map
            )

        case 'workTreeClean':
            return DevContentOpsSupport.withSiteId(
                siteId,
                DevContentOpsWorkTreeSupport.cleanWorkTree(
                    helper,
                    applicationContext,
                    siteId,
                    (payload.paths instanceof List) ? payload.paths as List : [],
                    DevContentOpsSupport.toBoolean(payload.allUntracked, false)
                ) as Map
            )

        case 'workTreeCommit':
            return DevContentOpsSupport.withSiteId(
                siteId,
                DevContentOpsWorkTreeSupport.commitWorkTree(
                    helper,
                    applicationContext,
                    siteId,
                    DevContentOpsSupport.jsonSafeText(payload.message ?: '')
                ) as Map
            )

        case 'workTreeResolveConflict':
            return DevContentOpsSupport.withSiteId(
                siteId,
                DevContentOpsWorkTreeSupport.resolveConflict(
                    helper,
                    applicationContext,
                    siteId,
                    DevContentOpsSupport.jsonSafeText(payload.path ?: ''),
                    DevContentOpsSupport.jsonSafeText(payload.strategy ?: 'ours')
                ) as Map
            )

        case 'workTreeResetHard':
            if (!DevContentOpsSupport.toBoolean(payload.confirmed, false)) {
                response.status = 400
                return DevContentOpsSupport.errorMap('Confirmation is required')
            }
            return DevContentOpsSupport.withSiteId(
                siteId,
                DevContentOpsWorkTreeSupport.resetHardWorkTree(helper, applicationContext, siteId) as Map
            )

        case 'syncBlobStore':
            def syncTarget = DevContentOpsSupport.jsonSafeText(payload.target ?: '')
            def syncPaths = (payload.paths instanceof List) ? payload.paths as List : []
            def syncStoreId = DevContentOpsSupport.jsonSafeText(payload.storeId ?: '')
            return DevContentOpsSupport.withSiteId(
                siteId,
                DevContentOpsBlobStoreSupport.syncBlobPaths(
                    applicationContext,
                    sitesSvc,
                    siteId,
                    syncTarget,
                    syncPaths,
                    syncStoreId
                ) as Map
            )

        case 'restoreBlobVersion':
            def restoreStoreId = DevContentOpsSupport.jsonSafeText(payload.storeId ?: '')
            def restorePath = DevContentOpsSupport.jsonSafeText(payload.path ?: '')
            def restoreVersionId = DevContentOpsSupport.jsonSafeText(payload.versionId ?: '')
            def restoreTarget = DevContentOpsSupport.jsonSafeText(payload.target ?: 'preview')
            def restoreDeleteMarker = DevContentOpsSupport.toBoolean(payload.deleteMarker, false)
            if (!restoreStoreId) {
                response.status = 400
                return DevContentOpsSupport.errorMap('storeId is required')
            }
            if (!restorePath) {
                response.status = 400
                return DevContentOpsSupport.errorMap('path is required')
            }
            return DevContentOpsSupport.withSiteId(
                siteId,
                DevContentOpsBlobStoreSupport.restoreBlobVersion(
                    applicationContext,
                    contentRepo,
                    siteId,
                    restoreStoreId,
                    restorePath,
                    restoreVersionId,
                    restoreTarget,
                    restoreDeleteMarker
                ) as Map
            )

        default:
            response.status = 400
            return DevContentOpsSupport.errorMap("Unknown action: ${action}")
    }
} catch (Exception e) {
    response.status = 500
    return DevContentOpsSupport.failureFromThrowable(e, 'dev-content-ops-git POST failed')
}
