package plugins.org.rd.plugin.uigoodies

import org.craftercms.studio.api.v2.dal.AuditLog
import org.craftercms.studio.api.v2.dal.Site
import org.craftercms.studio.api.v2.service.audit.internal.AuditServiceInternal
import org.slf4j.Logger
import org.slf4j.LoggerFactory

import java.sql.Connection
import java.sql.PreparedStatement
import java.sql.ResultSet
import java.time.ZoneOffset
import java.time.ZonedDateTime

/**
 * Studio database maintenance helpers (sysadmin only).
 */
final class DevContentOpsDatabaseSupport {

    private static final Logger LOG = LoggerFactory.getLogger(DevContentOpsDatabaseSupport)

    private DevContentOpsDatabaseSupport() {}

    private static boolean destructiveOpConfirmed(boolean confirmed) {
        return confirmed
    }

    private static Map requireDestructiveConfirmation(boolean confirmed) {
        if (!destructiveOpConfirmed(confirmed)) {
            return DevContentOpsSupport.errorMap(
                'Confirmation is required',
                'Check the confirmation box in Studio before running this action.'
            )
        }
        return null
    }

    static Map checkAccess(def applicationContext, def request) {
        Object securityService = resolveSecurityService(applicationContext)
        if (!securityService) {
            return DevContentOpsSupport.errorMap(
                'Security service is not available in Studio',
                'Requires studio.securityService bean.'
            )
        }
        String rawUser = request?.remoteUser
        try {
            rawUser = securityService.getCurrentUser() ?: rawUser
        } catch (Exception ignored) {
            try {
                rawUser = securityService.currentUser ?: rawUser
            } catch (Exception ignored2) {
            }
        }
        String username = DevContentOpsSupport.plainString(rawUser)
        if (!username) {
            return [success: false, systemAdmin: false, username: '', error: 'Not authenticated']
        }
        boolean systemAdmin = securityService.isSystemAdmin(username) ? true : false
        return [
            success: true,
            systemAdmin: systemAdmin,
            username: DevContentOpsSupport.jsonSafeText(username)
        ]
    }

    static Map requireSystemAdmin(def applicationContext, def request) {
        Map access = checkAccess(applicationContext, request)
        if (access.error && !access.success) {
            return access
        }
        if (!access.systemAdmin) {
            return [
                success: false,
                systemAdmin: false,
                error: DevContentOpsSupport.jsonSafeText('System administrator access required'),
                hint: DevContentOpsSupport.jsonSafeText('Only users with the system_admin role may manage audit history.')
            ]
        }
        return access
    }

    static Map fetchAuditStats(
        def applicationContext,
        String siteId,
        String scope,
        String beforeDate
    ) {
        AuditServiceInternal auditService = resolveAuditService(applicationContext)
        if (!auditService) {
            return DevContentOpsSupport.errorMap('Audit service is not available in Studio')
        }

        String normalizedScope = normalizeScope(scope)
        if (normalizedScope == 'site' && !siteId?.trim()) {
            return DevContentOpsSupport.errorMap('siteId is required for project scope')
        }

        ZonedDateTime cutoff = parseBeforeDateCutoff(beforeDate)
        String filterSiteId = normalizedScope == 'site' ? siteId.trim() : null
        ZonedDateTime dateTo = cutoff ? cutoff.minusSeconds(1) : null

        int matching = auditService.getAuditLogTotal(filterSiteId, null, null, false, null, dateTo, null, null, null)
        int total = auditService.getAuditLogTotal(filterSiteId, null, null, false, null, null, null, null, null)

        return DevContentOpsSupport.withSiteId(siteId, [
            success: true,
            scope: normalizedScope,
            mode: cutoff ? 'beforeDate' : 'all',
            beforeDate: DevContentOpsSupport.jsonSafeText(beforeDate ?: ''),
            cutoff: cutoff ? DevContentOpsSupport.jsonSafeText(cutoff.toString()) : '',
            totalEntries: total,
            matchingEntries: matching,
            deleteCount: cutoff ? matching : total
        ])
    }

    static Map fetchProcessedCommitsStats(def applicationContext, String siteId, String scope) {
        String normalizedScope = normalizeScope(scope)
        if (normalizedScope == 'site' && !siteId?.trim()) {
            return DevContentOpsSupport.errorMap('siteId is required for project scope')
        }

        Site site = normalizedScope == 'site' ? resolveSite(applicationContext, siteId) : null
        if (normalizedScope == 'site' && !site) {
            return DevContentOpsSupport.errorMap("Site not found: ${siteId}")
        }

        Object sitesSvc = applicationContext?.get('sitesService')
        String lastProcessedCommitId = null
        if (normalizedScope == 'site' && sitesSvc) {
            try {
                lastProcessedCommitId = DevContentOpsSupport.plainString(sitesSvc.getLastCommitId(siteId.trim()))
            } catch (Exception ignored) {
            }
        }

        Long siteNumericId = site?.id
        int rowCount = countProcessedCommits(applicationContext, normalizedScope == 'site' ? siteNumericId : null)

        return DevContentOpsSupport.withSiteId(siteId, [
            success: true,
            table: 'processed_commits',
            scope: normalizedScope,
            rowCount: rowCount,
            siteNumericId: siteNumericId,
            lastProcessedCommitId: DevContentOpsSupport.jsonSafeText(lastProcessedCommitId ?: ''),
            preservesLastProcessedCommit: true,
            description: DevContentOpsSupport.jsonSafeText(
                'Short-lived sync cache used while Studio ingests git commits. Does not store git history.'
            )
        ])
    }

    static Map truncateProcessedCommits(
        def applicationContext,
        def request,
        String siteId,
        String scope,
        boolean confirmed
    ) {
        Map access = requireSystemAdmin(applicationContext, request)
        if (access.success != true) {
            return access
        }
        String username = access.username as String

        Map confirmationError = requireDestructiveConfirmation(confirmed)
        if (confirmationError) {
            return confirmationError
        }

        AuditServiceInternal auditService = resolveAuditService(applicationContext)
        if (!auditService) {
            return DevContentOpsSupport.errorMap('Audit service is not available in Studio')
        }

        String normalizedScope = normalizeScope(scope)
        if (normalizedScope == 'site' && !siteId?.trim()) {
            return DevContentOpsSupport.errorMap('siteId is required for project scope')
        }

        Site site = normalizedScope == 'site' ? resolveSite(applicationContext, siteId) : null
        if (normalizedScope == 'site' && !site) {
            return DevContentOpsSupport.errorMap("Site not found: ${siteId}")
        }

        int deleteCount = truncateProcessedCommitsTable(
            applicationContext,
            normalizedScope == 'site' ? site.id : null
        )

        String summary = normalizedScope == 'site'
            ? "Truncated processed_commits for project ${siteId} (${deleteCount} rows)."
            : "Truncated processed_commits across Studio (${deleteCount} rows)."

        long auditSiteId = site?.id ?: resolveAuditSiteId(applicationContext, siteId)
        logDatabaseMaintenance(
            applicationContext,
            auditService,
            auditSiteId,
            username,
            summary,
            'processed_commits',
            normalizedScope,
            deleteCount
        )

        LOG.warn(
            '[uigoodies DevContentOps] processed_commits truncated by {} — scope={}, siteId={}, deleted={} — {}',
            username,
            normalizedScope,
            DevContentOpsSupport.plainString(siteId),
            deleteCount,
            summary
        )

        return DevContentOpsSupport.withSiteId(siteId, [
            success: true,
            table: 'processed_commits',
            scope: normalizedScope,
            deletedCount: deleteCount,
            message: DevContentOpsSupport.jsonSafeText(summary),
            preservesLastProcessedCommit: true
        ])
    }

    static Map truncateAuditHistory(
        def applicationContext,
        def request,
        String siteId,
        String scope,
        String mode,
        String beforeDate,
        boolean confirmed
    ) {
        Map access = requireSystemAdmin(applicationContext, request)
        if (access.success != true) {
            return access
        }
        String username = access.username as String

        Map confirmationError = requireDestructiveConfirmation(confirmed)
        if (confirmationError) {
            return confirmationError
        }

        AuditServiceInternal auditService = resolveAuditService(applicationContext)
        if (!auditService) {
            return DevContentOpsSupport.errorMap('Audit service is not available in Studio')
        }

        String normalizedScope = normalizeScope(scope)
        String normalizedMode = normalizeMode(mode)
        if (normalizedScope == 'site' && !siteId?.trim()) {
            return DevContentOpsSupport.errorMap('siteId is required for project scope')
        }
        ZonedDateTime cutoff = null
        if (normalizedMode == 'beforeDate') {
            cutoff = parseBeforeDateCutoff(beforeDate)
            if (!cutoff) {
                return DevContentOpsSupport.errorMap('beforeDate is required for before-date truncation (YYYY-MM-DD)')
            }
        }

        int deleteCount = 0
        String summary
        long auditSiteId = resolveAuditSiteId(applicationContext, siteId)

        if (normalizedScope == 'site') {
            Site site = resolveSite(applicationContext, siteId)
            if (!site) {
                return DevContentOpsSupport.errorMap("Site not found: ${siteId}")
            }
            auditSiteId = site.id
            if (normalizedMode == 'all') {
                deleteCount = auditService.getAuditLogTotal(siteId.trim(), null, null, false, null, null, null, null, null)
                auditService.deleteAuditLogForSite(site.id)
                summary = "Deleted all audit history for project ${siteId} (${deleteCount} entries)."
            } else {
                deleteCount = deleteAuditBeforeDate(applicationContext, siteId.trim(), cutoff)
                summary = "Deleted audit history before ${beforeDate} for project ${siteId} (${deleteCount} entries)."
            }
        } else {
            if (normalizedMode == 'all') {
                deleteCount = auditService.getAuditLogTotal(null, null, null, false, null, null, null, null, null)
                deleteAllAuditHistory(applicationContext)
                summary = "Deleted all audit history across Studio (${deleteCount} entries)."
            } else {
                deleteCount = auditService.getAuditLogTotal(null, null, null, false, null, cutoff.minusSeconds(1), null, null, null)
                deleteCount = deleteAuditBeforeDate(applicationContext, null, cutoff)
                summary = "Deleted audit history before ${beforeDate} across Studio (${deleteCount} entries)."
            }
        }

        logDatabaseMaintenance(
            applicationContext,
            auditService,
            auditSiteId,
            username,
            summary,
            'audit',
            normalizedScope,
            deleteCount,
            normalizedMode,
            beforeDate
        )

        LOG.warn(
            '[uigoodies DevContentOps] Audit history truncated by {} — scope={}, mode={}, siteId={}, beforeDate={}, deleted={} — {}',
            username,
            normalizedScope,
            normalizedMode,
            DevContentOpsSupport.plainString(siteId),
            DevContentOpsSupport.plainString(beforeDate),
            deleteCount,
            summary
        )

        return DevContentOpsSupport.withSiteId(siteId, [
            success: true,
            scope: normalizedScope,
            mode: normalizedMode,
            beforeDate: DevContentOpsSupport.jsonSafeText(beforeDate ?: ''),
            deletedCount: deleteCount,
            message: DevContentOpsSupport.jsonSafeText(summary)
        ])
    }

    private static void logDatabaseMaintenance(
        def applicationContext,
        AuditServiceInternal auditService,
        long auditSiteId,
        String username,
        String summary,
        String targetTable,
        String scope,
        int deleteCount,
        String mode = 'all',
        String beforeDate = null
    ) {
        try {
            AuditLog auditLog = auditService.createAuditLogEntry()
            auditLog.siteId = auditSiteId
            auditLog.operation = 'DELETE'
            auditLog.primaryTargetType = 'Database Table'
            auditLog.primaryTargetValue = DevContentOpsSupport.jsonSafeText(
                "${summary} table=${targetTable}; scope=${scope}; mode=${mode}; beforeDate=${beforeDate ?: 'n/a'}; deleted=${deleteCount}"
            )
            auditLog.actorId = DevContentOpsSupport.plainString(username)
            auditLog.actorDetails = DevContentOpsSupport.jsonSafeText('DevContentOps Database tab')
            auditLog.operationTimestamp = ZonedDateTime.now(ZoneOffset.UTC)
            auditService.insertAuditLog(auditLog)
        } catch (Exception e) {
            LOG.error('[uigoodies DevContentOps] Failed to write audit log entry for database maintenance: {}', e.message, e)
        }
    }

    private static int countProcessedCommits(def applicationContext, Long siteNumericId) {
        def dataSource = applicationContext?.get('dataSource')
        if (!dataSource) {
            throw new IllegalStateException('dataSource bean is not available')
        }
        Connection conn = dataSource.connection
        try {
            PreparedStatement ps = siteNumericId != null
                ? conn.prepareStatement('SELECT COUNT(1) FROM processed_commits WHERE site_id = ?')
                : conn.prepareStatement('SELECT COUNT(1) FROM processed_commits')
            try {
                if (siteNumericId != null) {
                    ps.setObject(1, siteNumericId)
                }
                ResultSet rs = ps.executeQuery()
                try {
                    return rs.next() ? rs.getInt(1) : 0
                } finally {
                    rs.close()
                }
            } finally {
                ps.close()
            }
        } finally {
            conn.close()
        }
    }

    private static int truncateProcessedCommitsTable(def applicationContext, Long siteNumericId) {
        def dataSource = applicationContext?.get('dataSource')
        if (!dataSource) {
            throw new IllegalStateException('dataSource bean is not available')
        }
        Connection conn = dataSource.connection
        try {
            conn.autoCommit = false
            int deleted = siteNumericId != null
                ? executeUpdate(conn, 'DELETE FROM processed_commits WHERE site_id = ?', siteNumericId)
                : executeUpdate(conn, 'DELETE FROM processed_commits')
            conn.commit()
            return deleted
        } catch (Exception e) {
            try {
                conn.rollback()
            } catch (Exception ignored) {
            }
            throw e
        } finally {
            try {
                conn.close()
            } catch (Exception ignored) {
            }
        }
    }

    private static int deleteAllAuditHistory(def applicationContext) {
        def dataSource = applicationContext?.get('dataSource')
        if (!dataSource) {
            throw new IllegalStateException('dataSource bean is not available')
        }
        Connection conn = dataSource.connection
        try {
            conn.autoCommit = false
            int paramsDeleted = executeUpdate(conn, 'DELETE FROM audit_parameters')
            int auditDeleted = executeUpdate(conn, 'DELETE FROM audit')
            conn.commit()
            return auditDeleted
        } catch (Exception e) {
            try {
                conn.rollback()
            } catch (Exception ignored) {
            }
            throw e
        } finally {
            try {
                conn.close()
            } catch (Exception ignored) {
            }
        }
    }

    private static int deleteAuditBeforeDate(def applicationContext, String siteId, ZonedDateTime cutoff) {
        def dataSource = applicationContext?.get('dataSource')
        if (!dataSource) {
            throw new IllegalStateException('dataSource bean is not available')
        }
        Connection conn = dataSource.connection
        java.sql.Timestamp cutoffTs = java.sql.Timestamp.from(cutoff.toInstant())
        try {
            conn.autoCommit = false
            int paramsDeleted
            int auditDeleted
            if (siteId?.trim()) {
                paramsDeleted = executeUpdate(
                    conn,
                    'DELETE ap FROM audit_parameters ap INNER JOIN audit a ON ap.audit_id = a.id ' +
                        'INNER JOIN site s ON a.site_id = s.id WHERE s.deleted = 0 AND s.site_id = ? AND a.operation_timestamp < ?',
                    siteId.trim(),
                    cutoffTs
                )
                auditDeleted = executeUpdate(
                    conn,
                    'DELETE a FROM audit a INNER JOIN site s ON a.site_id = s.id ' +
                        'WHERE s.deleted = 0 AND s.site_id = ? AND a.operation_timestamp < ?',
                    siteId.trim(),
                    cutoffTs
                )
            } else {
                paramsDeleted = executeUpdate(
                    conn,
                    'DELETE ap FROM audit_parameters ap INNER JOIN audit a ON ap.audit_id = a.id WHERE a.operation_timestamp < ?',
                    cutoffTs
                )
                auditDeleted = executeUpdate(
                    conn,
                    'DELETE FROM audit WHERE operation_timestamp < ?',
                    cutoffTs
                )
            }
            conn.commit()
            return auditDeleted
        } catch (Exception e) {
            try {
                conn.rollback()
            } catch (Exception ignored) {
            }
            throw e
        } finally {
            try {
                conn.close()
            } catch (Exception ignored) {
            }
        }
    }

    private static int executeUpdate(Connection conn, String sql, Object... params) {
        PreparedStatement ps = conn.prepareStatement(sql)
        try {
            for (int i = 0; i < params.length; i++) {
                ps.setObject(i + 1, params[i])
            }
            return ps.executeUpdate()
        } finally {
            try {
                ps.close()
            } catch (Exception ignored) {
            }
        }
    }

    private static Site resolveSite(def applicationContext, String siteId) {
        def sitesSvc = applicationContext?.get('sitesService')
        if (!sitesSvc || !siteId?.trim()) {
            return null
        }
        try {
            return sitesSvc.getSite(siteId.trim()) as Site
        } catch (Exception ignored) {
            return null
        }
    }

    private static long resolveAuditSiteId(def applicationContext, String siteId) {
        Site site = resolveSite(applicationContext, siteId)
        if (site) {
            return site.id
        }
        return 0L
    }

    private static ZonedDateTime parseBeforeDateCutoff(String beforeDate) {
        String text = DevContentOpsSupport.plainString(beforeDate)?.trim()
        if (!text) {
            return null
        }
        if (!text.matches(/^\d{4}-\d{2}-\d{2}$/)) {
            throw new IllegalArgumentException('beforeDate must use YYYY-MM-DD format')
        }
        return ZonedDateTime.parse("${text}T00:00:00Z")
    }

    private static String normalizeScope(String scope) {
        String value = DevContentOpsSupport.plainString(scope)?.trim()?.toLowerCase()
        return value == 'global' ? 'global' : 'site'
    }

    private static String normalizeMode(String mode) {
        String value = DevContentOpsSupport.plainString(mode)?.trim()?.toLowerCase()
        return value == 'beforedate' || value == 'before_date' ? 'beforeDate' : 'all'
    }

    private static Object resolveSecurityService(def applicationContext) {
        return applicationContext?.get('studio.securityService') ?: applicationContext?.get('cstudioSecurityService')
    }

    private static AuditServiceInternal resolveAuditService(def applicationContext) {
        return applicationContext?.get('auditServiceInternal') as AuditServiceInternal
    }
}
