/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 *
 * Studio plugin script: build a cross-site content copy plan.
 *
 * POST /studio/api/2/plugin/script/plugins/org/rd/plugin/uigoodies/cross-site-content-copy-plan?siteId=<sourceSiteId>
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

def payload = CrossSiteContentCopySupport.readJsonBody(request)
if (payload == null) {
    response.status = 400
    return [error: 'Invalid JSON in request body']
}
def sourceSiteId = (params.siteId ?: payload?.sourceSiteId ?: '').toString().trim()
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

def primaryPaths = new LinkedHashSet<String>()
def pathToSelection = [:]

sourcePaths.each { selection ->
    CrossSiteContentCopySupport.collectPrimaryPaths(contentService, sourceSiteId, selection).each { path ->
        primaryPaths.add(path)
        if (!pathToSelection.containsKey(path)) {
            pathToSelection[path] = selection
        }
    }
}

def allPaths = CrossSiteContentCopySupport.buildAllPaths(
    contentService,
    dependencyService,
    sourceSiteId,
    sourcePaths,
    copyDependencies
)

def items = allPaths
    .findAll { path -> !CrossSiteContentCopySupport.isKeepFile(path) }
    .collect { path ->
    def pathStr = CrossSiteContentCopySupport.plainPath(path)
    def item = contentService.getContentItem(sourceSiteId, pathStr)
    [
        path               : pathStr,
        folder             : item?.folder ?: false,
        existsOnDestination: contentService.contentExists(destinationSiteId, pathStr),
        role               : primaryPaths.contains(pathStr) ? 'primary' : 'dependency',
        sourceSelection    : CrossSiteContentCopySupport.plainPath(pathToSelection[pathStr])
    ]
}.sort { a, b -> a.path <=> b.path }

return [
    sourceSiteId       : sourceSiteId,
    destinationSiteId  : destinationSiteId,
    sourcePaths        : sourcePaths,
    sourcePath         : sourcePaths[0],
    copyDependencies   : copyDependencies,
    total              : items.size(),
    overwriteCount     : items.count { it.existsOnDestination && !it.folder },
    items              : items
]
