/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 *
 * POST /studio/api/2/plugin/script/plugins/org/rd/plugin/uigoodies/database-tools?siteId=<site>
 * Body: { "action": "truncateAudit|truncateProcessedCommits", ... }
 */

import plugins.org.rd.plugin.uigoodies.DevContentOpsDatabaseSupport
import plugins.org.rd.plugin.uigoodies.DevContentOpsSupport

try {
    def siteResolution = DevContentOpsSupport.resolveRequestSiteId(params.siteId as String)
    if (siteResolution.error) {
        response.status = 400
        return siteResolution.error
    }
    def siteId = siteResolution.siteId as String

    def payload = DevContentOpsSupport.readJsonBody(request)
    if (payload == null) {
        response.status = 400
        return DevContentOpsSupport.errorMap('Invalid JSON body')
    }

    def action = DevContentOpsSupport.jsonSafeText(payload.action ?: '')
    def access = DevContentOpsDatabaseSupport.requireSystemAdmin(applicationContext, request)
    if (access.success != true) {
        response.status = 403
        return access
    }

    def result
    switch (action) {
        case 'truncateAudit':
            result = DevContentOpsDatabaseSupport.truncateAuditHistory(
                applicationContext,
                request,
                siteId,
                DevContentOpsSupport.jsonSafeText(payload.scope ?: 'site'),
                DevContentOpsSupport.jsonSafeText(payload.mode ?: 'all'),
                DevContentOpsSupport.jsonSafeText(payload.beforeDate ?: ''),
                payload.confirmed == true
            )
            break

        case 'truncateProcessedCommits':
            result = DevContentOpsDatabaseSupport.truncateProcessedCommits(
                applicationContext,
                request,
                siteId,
                DevContentOpsSupport.jsonSafeText(payload.scope ?: 'site'),
                payload.confirmed == true
            )
            break

        default:
            response.status = 400
            return DevContentOpsSupport.errorMap("Unknown action: ${action}")
    }

    if (result.error && result.success != true) {
        response.status = result.error?.toLowerCase()?.contains('confirmation') ? 400 : 403
    }
    return result
} catch (IllegalArgumentException e) {
    response.status = 400
    return DevContentOpsSupport.errorMap(e.message ?: 'Invalid request')
} catch (Exception e) {
    response.status = 500
    return DevContentOpsSupport.failureFromThrowable(e, 'database-tools POST failed')
}
