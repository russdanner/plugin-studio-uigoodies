/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 *
 * Studio plugin script: build a cross-site content copy plan.
 *
 * POST /studio/api/2/plugin/script/plugins/org/rd/plugin/uigoodies/cross-site-content-copy-plan?siteId=<studioSiteId>
 * Body: { "sourceSiteId": "...", "sourcePaths": ["...", "..."], "destinationSiteId": "...", "copyDependencies": true|false }
 * Legacy: siteId query param or single "sourcePath" are also accepted as sourceSiteId / sourcePaths.
 */

import plugins.org.rd.plugin.uigoodies.CrossSiteContentCopySupport

try {
    def contentService = applicationContext.get('cstudioContentService')
    def dependencyService = applicationContext.get('dependencyServiceInternal')

    if (!contentService) {
        response.status = 500
        return CrossSiteContentCopySupport.errorMap('Content service is not available in Studio.')
    }

    def payload = CrossSiteContentCopySupport.readJsonBody(request)
    if (payload == null) {
        response.status = 400
        return CrossSiteContentCopySupport.errorMap('Invalid JSON in request body')
    }
    def sourceSiteId = CrossSiteContentCopySupport.jsonSafeText(payload?.sourceSiteId ?: params.siteId ?: '')
    def sourcePaths = CrossSiteContentCopySupport.resolveSourcePaths(payload)
    def destinationSiteId = CrossSiteContentCopySupport.jsonSafeText(payload.destinationSiteId ?: '')
    def copyDependencies = payload.copyDependencies != false

    if (copyDependencies && !dependencyService) {
        response.status = 500
        return CrossSiteContentCopySupport.errorMap('Dependency service is not available. Turn off "Include dependencies" or contact your Studio administrator.')
    }

    if (!sourceSiteId) {
        response.status = 400
        return CrossSiteContentCopySupport.errorMap('sourceSiteId is required (request body sourceSiteId or siteId query param)')
    }
    if (sourcePaths.isEmpty()) {
        response.status = 400
        return CrossSiteContentCopySupport.errorMap('At least one source path is required (sourcePaths)')
    }
    if (!destinationSiteId) {
        response.status = 400
        return CrossSiteContentCopySupport.errorMap('destinationSiteId is required')
    }
    if (sourceSiteId == destinationSiteId) {
        response.status = 400
        return CrossSiteContentCopySupport.errorMap('Source and destination project must be different')
    }

    if (!CrossSiteContentCopySupport.siteSandboxReachable(contentService, destinationSiteId)) {
        response.status = 404
        return CrossSiteContentCopySupport.errorMap("Destination project not found or not accessible: ${destinationSiteId}")
    }

    // Sandbox-safe helpers: do not call CrossSiteContentCopySupport static methods from Groovy closures directly.
    def pathExistsForSite = { siteId, rawPath ->
        CrossSiteContentCopySupport.pathExists(contentService, siteId, rawPath)
    }
    def jsonSafe = { value -> CrossSiteContentCopySupport.jsonSafeText(value) }
    def addUnique = { list, value -> CrossSiteContentCopySupport.addUniquePath(list, value) }

    def missingPaths = []
    for (entry in sourcePaths) {
        if (!pathExistsForSite(sourceSiteId, entry)) {
            missingPaths.add(entry)
        }
    }
    if (!missingPaths.isEmpty()) {
        response.status = 404
        return CrossSiteContentCopySupport.errorMap("Source path(s) not found in ${sourceSiteId}: ${missingPaths.join(', ')}")
    }

    def primaryPaths = []
    def pathToSelection = [:]

    for (selection in sourcePaths) {
        def collected = CrossSiteContentCopySupport.collectPrimaryPathsResult(contentService, sourceSiteId, selection)
        if (collected.error) {
            response.status = 400
            return CrossSiteContentCopySupport.errorMap(collected.error)
        }
        for (path in (collected.paths ?: [])) {
            addUnique(primaryPaths, path)
            if (!pathToSelection.containsKey(path)) {
                pathToSelection[path] = selection
            }
        }
    }

    def pathResult = CrossSiteContentCopySupport.buildAllPathsResult(
        contentService,
        dependencyService,
        sourceSiteId,
        sourcePaths,
        copyDependencies
    )
    if (pathResult.error) {
        response.status = 400
        return CrossSiteContentCopySupport.errorMap(pathResult.error)
    }
    def allPaths = pathResult.paths ?: []

    def items = []
    for (path in allPaths) {
        def pathStr = jsonSafe(path)
        def item = CrossSiteContentCopySupport.safeGetContentItem(contentService, sourceSiteId, pathStr)
        def existsOnDestination = false
        try {
            existsOnDestination = contentService.contentExists(destinationSiteId, pathStr)
        } catch (Exception ignored) {
        }
        items.add([
            path               : pathStr,
            folder             : item?.folder ?: false,
            existsOnDestination: existsOnDestination,
            role               : primaryPaths.contains(pathStr) ? 'primary' : 'dependency',
            sourceSelection    : jsonSafe(pathToSelection[pathStr])
        ])
    }
    for (int i = 0; i < items.size(); i++) {
        for (int j = i + 1; j < items.size(); j++) {
            if (items[i].path > items[j].path) {
                def tmp = items[i]
                items[i] = items[j]
                items[j] = tmp
            }
        }
    }

    def safeSourcePaths = []
    for (entry in sourcePaths) {
        safeSourcePaths.add(jsonSafe(entry))
    }

    def overwriteCount = 0
    for (item in items) {
        if (item.existsOnDestination && !item.folder) {
            overwriteCount++
        }
    }

    return [
        sourceSiteId       : sourceSiteId,
        destinationSiteId  : destinationSiteId,
        sourcePaths        : safeSourcePaths,
        sourcePath         : jsonSafe(sourcePaths[0]),
        copyDependencies   : copyDependencies,
        total              : items.size(),
        overwriteCount     : overwriteCount,
        items              : items
    ]
} catch (Throwable t) {
    response.status = 500
    return CrossSiteContentCopySupport.failureFromThrowable(t, 'Failed to build copy plan')
}
