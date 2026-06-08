/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 *
 * Studio plugin script: execute a cross-site content copy.
 *
 * POST /studio/api/2/plugin/script/plugins/org/rd/plugin/uigoodies/cross-site-content-copy?siteId=<sourceSiteId>
 * Body: { "sourcePaths": ["...", "..."], "destinationSiteId": "...", "copyDependencies": true|false }
 * Legacy: single "sourcePath" is also accepted.
 */

import plugins.org.rd.plugin.uigoodies.CrossSiteContentCopySupport

def contentService = applicationContext.get('cstudioContentService')
def dependencyService = applicationContext.get('dependencyServiceInternal')

if (!contentService) {
    response.status = 500
    return [error: 'cstudioContentService bean is not available']
}

def sourceSiteId = (params.siteId ?: '').toString().trim()
def payload = CrossSiteContentCopySupport.readJsonBody(request)
if (payload == null) {
    response.status = 400
    return [error: 'Invalid JSON in request body']
}
def sourcePaths = CrossSiteContentCopySupport.resolveSourcePaths(payload)
def destinationSiteId = (payload.destinationSiteId ?: '').toString().trim()
def copyDependencies = payload.copyDependencies != false

if (copyDependencies && !dependencyService) {
    response.status = 500
    return [error: 'dependencyServiceInternal bean is not available']
}

if (!sourceSiteId) {
    response.status = 400
    return [error: 'sourceSiteId (siteId query param) is required']
}
if (sourcePaths.isEmpty()) {
    response.status = 400
    return [error: 'At least one source path is required (sourcePaths)']
}
if (!destinationSiteId) {
    response.status = 400
    return [error: 'destinationSiteId is required']
}
if (sourceSiteId == destinationSiteId) {
    response.status = 400
    return [error: 'Source and destination project must be different']
}

def missingPaths = sourcePaths.findAll { !CrossSiteContentCopySupport.pathExists(contentService, sourceSiteId, it) }
if (!missingPaths.isEmpty()) {
    response.status = 404
    return [error: "Source path(s) not found: ${missingPaths.join(', ')}"]
}

def successes = []
def failures = []
def skipped = []

def ensureFolderExists = CrossSiteContentCopySupport.ensureFolderExistsFactory(contentService)

def copyContentFile = { String path ->
    def pathStr = CrossSiteContentCopySupport.plainPath(path)
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

def allPaths = CrossSiteContentCopySupport.buildAllPaths(
    contentService,
    dependencyService,
    sourceSiteId,
    sourcePaths,
    copyDependencies
)

def sortedPaths = allPaths.sort { a, b ->
    def depthA = a.count('/')
    def depthB = b.count('/')
    depthA != depthB ? depthA <=> depthB : a <=> b
}

sortedPaths.each { path ->
    def pathStr = CrossSiteContentCopySupport.plainPath(path)
    if (CrossSiteContentCopySupport.isKeepFile(pathStr)) {
        return
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
        return
    }

    try {
        copyContentFile(pathStr)
    } catch (Exception e) {
        failures << [path: pathStr, message: CrossSiteContentCopySupport.plainPath(e.message ?: e.class.simpleName)]
    }
}

if (successes.isEmpty() && failures.isEmpty() && !skipped.isEmpty()) {
    failures << [path: sourcePaths.join(', '), message: 'No content files were copied (only folders were processed)']
}

return [
    sourceSiteId      : sourceSiteId,
    destinationSiteId : destinationSiteId,
    sourcePaths       : sourcePaths,
    sourcePath        : sourcePaths[0],
    copyDependencies  : copyDependencies,
    successCount      : successes.size(),
    failureCount      : failures.size(),
    skippedCount      : skipped.size(),
    successes         : successes,
    failures          : failures,
    skipped           : skipped
]
