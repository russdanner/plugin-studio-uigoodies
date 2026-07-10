/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 *
 * GET /studio/api/2/plugin/script/plugins/org/rd/plugin/uigoodies/database-tools?siteId=<site>&action=<action>
 *
 * Actions: access | auditStats | processedCommitsStats
 */

import plugins.org.rd.plugin.uigoodies.DevContentOpsDatabaseSupport
import plugins.org.rd.plugin.uigoodies.DevContentOpsSupport

try {
    def siteResolution = DevContentOpsSupport.resolveRequestSiteId(params.siteId as String)
    if (siteResolution.error) {
        response.status = 400
        return siteResolution.error
    }
    def studioSiteId = siteResolution.siteId as String
    def siteId = DevContentOpsSupport.resolveOperationSiteId(studioSiteId, params)
    def action = DevContentOpsSupport.jsonSafeText(params.action ?: 'access')

    switch (action) {
        case 'access':
            try {
                return DevContentOpsSupport.withSiteId(
                    siteId,
                    DevContentOpsDatabaseSupport.checkAccess(applicationContext, request) as Map
                )
            } catch (Throwable t) {
                return DevContentOpsSupport.withSiteId(
                    siteId,
                    DevContentOpsSupport.failureFromThrowable(t, 'database access check failed')
                )
            }

        case 'auditStats':
            def access = DevContentOpsDatabaseSupport.requireSystemAdmin(applicationContext, request)
            if (access.success != true) {
                response.status = 403
                return access
            }
            return DevContentOpsDatabaseSupport.fetchAuditStats(
                applicationContext,
                siteId,
                DevContentOpsSupport.jsonSafeText(params.scope ?: 'site'),
                DevContentOpsSupport.jsonSafeText(params.beforeDate ?: '')
            )

        case 'processedCommitsStats':
            def processedAccess = DevContentOpsDatabaseSupport.requireSystemAdmin(applicationContext, request)
            if (processedAccess.success != true) {
                response.status = 403
                return processedAccess
            }
            return DevContentOpsDatabaseSupport.fetchProcessedCommitsStats(
                applicationContext,
                siteId,
                DevContentOpsSupport.jsonSafeText(params.scope ?: 'site')
            )

        default:
            response.status = 400
            return DevContentOpsSupport.errorMap("Unknown action: ${action}")
    }
} catch (IllegalArgumentException e) {
    response.status = 400
    return DevContentOpsSupport.errorMap(e.message ?: 'Invalid request')
} catch (Throwable t) {
    response.status = 500
    return DevContentOpsSupport.failureFromThrowable(t, 'database-tools GET failed')
}
