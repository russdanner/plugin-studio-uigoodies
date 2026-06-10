/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 *
 * Studio plugin script: execute a cross-site content copy.
 *
 * POST /studio/api/2/plugin/script/plugins/org/rd/plugin/uigoodies/cross-site-content-copy?siteId=<studioSiteId>
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

    def pathExistsForSite = { siteId, rawPath ->
        CrossSiteContentCopySupport.pathExists(contentService, siteId, rawPath)
    }
    def jsonSafe = { value -> CrossSiteContentCopySupport.jsonSafeText(value) }
    def plainPath = { value -> CrossSiteContentCopySupport.plainPath(value) }
    def isKeepFile = { path -> CrossSiteContentCopySupport.isKeepFile(path) }

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

    def successes = []
    def failures = []
    def skipped = []

    def ensureFolderExists = CrossSiteContentCopySupport.ensureFolderExistsFactory(contentService)

    def copyContentFile = { String path ->
        def pathStr = plainPath(path)
        def existed = contentService.contentExists(destinationSiteId, pathStr)
        def bytes = CrossSiteContentCopySupport.readContentBytes(contentService, sourceSiteId, pathStr)
        if (bytes == null) {
            failures << [path: pathStr, message: 'Unable to read source content']
            return
        }

        def sourceItem = null
        try {
            sourceItem = contentService.getContentItem(sourceSiteId, pathStr)
        } catch (Exception ignored) {
        }
        def contentType = sourceItem?.contentType ?: ''

        def parentSlash = pathStr.lastIndexOf('/')
        if (parentSlash > 0) {
            ensureFolderExists(destinationSiteId, pathStr.substring(0, parentSlash))
        }

        CrossSiteContentCopySupport.writeItem(contentService, destinationSiteId, pathStr, bytes, existed, contentType)
        successes << [path: pathStr, destinationPath: pathStr, overwritten: existed]
    }

    def sortedPaths = []
    sortedPaths.addAll(allPaths)
    java.util.Collections.sort(sortedPaths)

    for (path in sortedPaths) {
        def pathStr = plainPath(path)
        if (isKeepFile(pathStr)) {
            continue
        }
        def item = null
        try {
            item = contentService.getContentItem(sourceSiteId, pathStr)
        } catch (Exception ignored) {
        }

        if (item?.folder) {
            if (ensureFolderExists(destinationSiteId, pathStr)) {
                skipped << [path: pathStr, reason: 'folder-created']
            } else {
                failures << [path: pathStr, message: 'Unable to create destination folder']
            }
            continue
        }

        try {
            copyContentFile(pathStr)
        } catch (Exception e) {
            failures << [
                path   : pathStr,
                message: jsonSafe(e.message ?: e.class.simpleName)
            ]
        }
    }

    if (successes.isEmpty() && failures.isEmpty() && !skipped.isEmpty()) {
        failures << [
            path   : jsonSafe(sourcePaths.join(', ')),
            message: 'No content files were copied (only folders were processed)'
        ]
    }

    def safeSourcePaths = []
    for (entry in sourcePaths) {
        safeSourcePaths.add(jsonSafe(entry))
    }

    return [
        sourceSiteId      : jsonSafe(sourceSiteId),
        destinationSiteId : jsonSafe(destinationSiteId),
        sourcePaths       : safeSourcePaths,
        sourcePath        : jsonSafe(sourcePaths[0]),
        copyDependencies  : copyDependencies,
        successCount      : successes.size(),
        failureCount      : failures.size(),
        skippedCount      : skipped.size(),
        successes         : successes,
        failures          : failures,
        skipped           : skipped
    ]
} catch (Throwable t) {
    response.status = 500
    return CrossSiteContentCopySupport.failureFromThrowable(t, 'Cross-site copy failed')
}
