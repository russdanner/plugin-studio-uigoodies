package plugins.org.rd.plugin.uigoodies

import org.eclipse.jgit.lib.Config
import org.eclipse.jgit.lib.Repository

import java.nio.file.Path

/**
 * Collects Git config and runtime object-store stats that affect repository performance.
 * Uses JGit config + NIO disk stats (sandbox-safe; no external git CLI).
 */
final class DevContentOpsRepoConfigSupport {

    private static final String GROUP_RUNTIME = 'Runtime object store'
    private static final String GROUP_GC = 'Garbage collection'
    private static final String GROUP_PACK = 'Packing & repack'
    private static final String GROUP_CORE = 'Core performance'
    private static final String GROUP_INDEX = 'Index & working tree'
    private static final String GROUP_MAINT = 'Maintenance'

    private DevContentOpsRepoConfigSupport() {}

    static Map collectRepoConfig(Repository repo, Path gitDirPath) {
        Map countObjects = countObjectsFromDisk(gitDirPath)
        List<Map> settings = []
        settings.addAll(buildCountObjectSettings(countObjects))
        CONFIG_SPECS.each { Map spec ->
            settings << buildConfigSetting(repo, spec)
        }
        return [
            settings: settings,
            countObjects: countObjects
        ]
    }

    private static Map countObjectsFromDisk(Path gitDirPath) {
        if (!gitDirPath) {
            return [:]
        }
        long looseBytes = DevContentOpsSandboxIoSupport.looseObjectBytes(gitDirPath)
        long packBytes = DevContentOpsSandboxIoSupport.packFileBytes(gitDirPath)
        int packs = DevContentOpsSandboxIoSupport.packFileCount(gitDirPath)
        int looseCount = DevContentOpsSandboxIoSupport.looseObjectCount(gitDirPath)
        long looseKb = looseBytes > 0L ? looseBytes.intdiv(1024) : 0L
        long packKb = packBytes > 0L ? packBytes.intdiv(1024) : 0L
        return [
            count: looseCount,
            size: looseKb,
            inPack: 0L,
            packs: packs,
            sizePack: packKb,
            prunePackable: 0L,
            garbage: 0L
        ]
    }

    private static List<Map> buildCountObjectSettings(Map countObjects) {
        if (!countObjects) {
            return []
        }
        List<Map> rows = []
        long looseCount = (countObjects.count ?: 0L) as long
        long looseKb = (countObjects.size ?: 0L) as long
        long inPack = (countObjects.inPack ?: 0L) as long
        long packs = (countObjects.packs ?: 0L) as long
        long packKb = (countObjects.sizePack ?: 0L) as long
        long prunePackable = (countObjects.prunePackable ?: 0L) as long

        rows << configRow(
            'count-objects.loose',
            GROUP_RUNTIME,
            'Loose objects',
            String.valueOf(looseCount),
            '',
            'runtime',
            '',
            'Objects stored outside packfiles. Many loose objects slow fetches and GC.',
            looseCount >= DevContentOpsRepoHealthThresholds.LOOSE_OBJECT_COUNT_CRITICAL
                ? 'High loose object count — run GC or repack.'
                : (looseCount >= DevContentOpsRepoHealthThresholds.LOOSE_OBJECT_COUNT_WARN
                    ? 'Elevated loose objects — common with frequent content commits; consider git gc --auto.'
                    : 'Loose object count looks normal.'),
            DevContentOpsRepoHealthThresholds.concernThreshold(
                looseCount,
                DevContentOpsRepoHealthThresholds.LOOSE_OBJECT_COUNT_WARN,
                DevContentOpsRepoHealthThresholds.LOOSE_OBJECT_COUNT_CRITICAL
            )
        )
        rows << configRow(
            'count-objects.loose-size',
            GROUP_RUNTIME,
            'Loose object size',
            formatKiB(looseKb),
            '',
            'runtime',
            '',
            'Disk space used by loose objects (KiB, approximate from .git/objects).',
            looseKb >= DevContentOpsRepoHealthThresholds.LOOSE_OBJECT_KIB_CRITICAL
                ? 'Large loose object footprint — repack recommended.'
                : (looseKb >= DevContentOpsRepoHealthThresholds.LOOSE_OBJECT_KIB_WARN
                    ? 'Elevated loose object size — consider running GC or repack.'
                    : 'Loose size within typical content sandbox range.'),
            DevContentOpsRepoHealthThresholds.concernThreshold(
                looseKb,
                DevContentOpsRepoHealthThresholds.LOOSE_OBJECT_KIB_WARN,
                DevContentOpsRepoHealthThresholds.LOOSE_OBJECT_KIB_CRITICAL
            )
        )
        rows << configRow(
            'count-objects.packs',
            GROUP_RUNTIME,
            'Pack files',
            String.valueOf(packs),
            '',
            'runtime',
            '',
            'Number of .pack files under objects/pack. Many packs slow object lookups.',
            packs >= DevContentOpsRepoHealthThresholds.PACK_FILE_COUNT_CRITICAL
                ? 'Many packfiles — repack or enable core.multiPackIndex.'
                : (packs >= DevContentOpsRepoHealthThresholds.PACK_FILE_COUNT_WARN
                    ? 'Elevated pack count — consider repacking to consolidate.'
                    : 'Pack file count looks normal.'),
            DevContentOpsRepoHealthThresholds.concernThreshold(
                packs,
                DevContentOpsRepoHealthThresholds.PACK_FILE_COUNT_WARN,
                DevContentOpsRepoHealthThresholds.PACK_FILE_COUNT_CRITICAL
            )
        )
        rows << configRow(
            'count-objects.in-pack',
            GROUP_RUNTIME,
            'Objects in packs',
            String.valueOf(inPack),
            '',
            'runtime',
            '',
            'Total objects stored in packfiles (not computed without git count-objects).',
            'Informational — compare with loose counts above.',
            0
        )
        rows << configRow(
            'count-objects.pack-size',
            GROUP_RUNTIME,
            'Packed size',
            formatKiB(packKb),
            '',
            'runtime',
            '',
            'Total size of packfiles (KiB, approximate).',
            'Informational — correlates with .git/objects/pack disk usage.',
            0
        )
        if (prunePackable > 0) {
            rows << configRow(
                'count-objects.prune-packable',
                GROUP_RUNTIME,
                'Prune-packable objects',
                String.valueOf(prunePackable),
                '',
                'runtime',
                '',
                'Loose objects that exist in packfiles and can be pruned.',
                'Run git gc or git prune to reclaim space.',
                DevContentOpsRepoHealthThresholds.concernThreshold(prunePackable, 1, 100)
            )
        }
        return rows
    }

    private static Map buildConfigSetting(Repository repo, Map spec) {
        String key = spec.key as String
        Config config = repo?.config
        String effective = null
        String source = 'default'
        String sourceDetail = ''

        if (config && key?.contains('.')) {
            List parts = key.split('\\.', 2)
            String section = parts[0]
            String name = parts[1]
            effective = config.getString(section, null, name)
            if (effective) {
                sourceDetail = '.git/config'
                source = classifyOrigin(sourceDetail)
            }
        }

        String displayValue = effective ?: (spec.defaultValue ?: '(unset)')
        String recommended = resolveRecommendedValue(spec)
        boolean deviates = settingDeviatesFromRecommended(effective, spec.defaultValue as String, recommended)
        Map evaluation = (spec.evaluate as Closure)?.call(effective) as Map ?: [concern: 0, note: '']
        String performanceNote = DevContentOpsSupport.plainString(evaluation.note ?: spec.defaultNote ?: '')
        int concern = (evaluation.concern ?: 0) as int

        return configRow(
            key,
            spec.group as String,
            spec.label as String,
            displayValue,
            spec.defaultValue as String,
            source,
            sourceDetail,
            spec.description as String,
            performanceNote,
            concern,
            recommended,
            deviates
        )
    }

    private static String resolveRecommendedValue(Map spec) {
        String recommended = spec.recommendedValue ?: spec.defaultValue
        return isComparableRecommended(recommended) ? recommended : ''
    }

    private static boolean isComparableRecommended(String value) {
        if (!value?.trim()) {
            return false
        }
        String v = value.trim()
        return !v.startsWith('(') && v != '(unset)'
    }

    private static boolean settingDeviatesFromRecommended(String effective, String defaultValue, String recommendedValue) {
        if (!isComparableRecommended(recommendedValue)) {
            return false
        }
        String actual = effective?.trim()
        if (!actual) {
            if (isComparableRecommended(defaultValue)) {
                actual = defaultValue.trim()
            } else {
                actual = recommendedValue.trim()
            }
        }
        return !actual.equalsIgnoreCase(recommendedValue.trim())
    }

    private static Map configRow(
        String key,
        String group,
        String label,
        String value,
        String defaultValue,
        String source,
        String sourceDetail = '',
        String description = '',
        String performanceNote = '',
        int concern = 0,
        String recommendedValue = '',
        boolean deviatesFromRecommended = false
    ) {
        return [
            key: DevContentOpsSupport.jsonSafeText(key),
            group: DevContentOpsSupport.jsonSafeText(group),
            label: DevContentOpsSupport.jsonSafeText(label),
            value: DevContentOpsSupport.jsonSafeText(value),
            defaultValue: DevContentOpsSupport.jsonSafeText(defaultValue),
            recommendedValue: DevContentOpsSupport.jsonSafeText(recommendedValue ?: ''),
            deviatesFromRecommended: deviatesFromRecommended,
            source: DevContentOpsSupport.jsonSafeText(source),
            sourceDetail: DevContentOpsSupport.jsonSafeText(sourceDetail),
            description: DevContentOpsSupport.jsonSafeText(description),
            performanceNote: DevContentOpsSupport.jsonSafeText(performanceNote),
            concern: concern
        ]
    }

    private static String classifyOrigin(String originDetail) {
        if (!originDetail) {
            return 'default'
        }
        if (originDetail == '.git/config' || originDetail.contains('/sandbox/.git/')) {
            return 'local'
        }
        if (originDetail.contains('.gitconfig') || originDetail.contains('git/config')) {
            return 'global'
        }
        if (originDetail.contains('/etc/gitconfig')) {
            return 'system'
        }
        return 'configured'
    }

    private static int parseIntSafe(String value) {
        if (!value?.trim()) {
            return 0
        }
        try {
            return Integer.parseInt(value.trim())
        } catch (Exception ignored) {
            return 0
        }
    }

    private static long parseLongSafe(String value) {
        if (!value?.trim()) {
            return 0L
        }
        try {
            return Long.parseLong(value.trim())
        } catch (Exception ignored) {
            return 0L
        }
    }

    private static long parseGitByteSize(String value) {
        if (!value?.trim()) {
            return 0L
        }
        String v = value.trim().toLowerCase()
        long multiplier = 1L
        if (v.endsWith('k')) {
            multiplier = 1024L
            v = v.substring(0, v.length() - 1)
        } else if (v.endsWith('m')) {
            multiplier = 1024L * 1024L
            v = v.substring(0, v.length() - 1)
        } else if (v.endsWith('g')) {
            multiplier = 1024L * 1024L * 1024L
            v = v.substring(0, v.length() - 1)
        }
        try {
            return (long) (Double.parseDouble(v) * multiplier)
        } catch (Exception ignored) {
            return parseLongSafe(value)
        }
    }

    private static String formatKiB(long kiB) {
        if (kiB < 1024) {
            return "${kiB} KiB"
        }
        if (kiB < 1024 * 1024) {
            return String.format('%.1f MiB', kiB / 1024.0)
        }
        return String.format('%.2f GiB', kiB / (1024.0 * 1024.0))
    }

    private static final List<Map> CONFIG_SPECS = [
        [
            key: 'gc.auto',
            group: GROUP_GC,
            label: 'gc.auto',
            defaultValue: '6700',
            description: 'Loose object count threshold before background auto-GC runs.',
            defaultNote: 'Uses Git default (6700) when unset.',
            evaluate: { String v ->
                int n = parseIntSafe(v ?: '6700')
                if (n <= 0) {
                    return [concern: 3, note: 'Auto-GC disabled — loose objects may accumulate.']
                }
                if (n > 50000) {
                    return [concern: 3, note: 'High threshold — GC runs less often; loose objects may accumulate between runs (watch on busy content sites).']
                }
                if (n > 15000) {
                    return [concern: 1, note: 'Elevated threshold — acceptable for low-churn sandboxes only.']
                }
                return [concern: 0, note: 'Auto-GC threshold looks reasonable.']
            }
        ],
        [
            key: 'gc.autoPackLimit',
            group: GROUP_GC,
            label: 'gc.autoPackLimit',
            defaultValue: '50',
            description: 'Number of pack files that triggers pack consolidation during gc --auto.',
            defaultNote: 'Uses Git default (50) when unset.',
            evaluate: { String v ->
                int n = parseIntSafe(v ?: '50')
                if (n > 1000) {
                    return [concern: 6, note: 'Very high — allows many pack files before consolidation (slows object lookups).']
                }
                if (n > 250) {
                    return [concern: 3, note: 'Elevated — may delay pack consolidation on active sandboxes.']
                }
                return [concern: 0, note: 'Typical auto-pack limit.']
            }
        ],
        [
            key: 'gc.pruneExpire',
            group: GROUP_GC,
            label: 'gc.pruneExpire',
            defaultValue: '2.weeks.ago',
            description: 'Grace period before unreachable loose objects are pruned during GC.',
            defaultNote: 'Uses Git default when unset.',
            evaluate: { String v ->
                if (v && v.trim() == 'now') {
                    return [concern: 3, note: 'Immediate prune — unreachable objects deleted as soon as GC runs.']
                }
                return [concern: 0, note: 'Standard prune grace period.']
            }
        ],
        [
            key: 'pack.threads',
            group: GROUP_PACK,
            label: 'pack.threads',
            defaultValue: '(CPU cores)',
            description: 'Threads used during repack and delta compression.',
            defaultNote: 'Git defaults to number of CPU cores.',
            evaluate: { String v ->
                if (!v?.trim()) {
                    return [concern: 0, note: 'Defaults to all CPU cores — good for repack speed.']
                }
                int n = parseIntSafe(v)
                if (n <= 1) {
                    return [concern: 6, note: 'Single-threaded repack — very slow on large sandboxes.']
                }
                return [concern: 0, note: 'Parallel repack enabled.']
            }
        ],
        [
            key: 'pack.window',
            group: GROUP_PACK,
            label: 'pack.window',
            defaultValue: '10',
            description: 'Delta compression window — higher finds better deltas but uses more memory/CPU.',
            defaultNote: 'Aggressive repack uses 250.',
            evaluate: { String v ->
                int n = parseIntSafe(v ?: '10')
                if (n < 10) {
                    return [concern: 3, note: 'Small window — faster repack but larger packs.']
                }
                return [concern: 0, note: 'Standard delta window.']
            }
        ],
        [
            key: 'pack.depth',
            group: GROUP_PACK,
            label: 'pack.depth',
            defaultValue: '50',
            description: 'Maximum delta chain depth in packfiles.',
            evaluate: { String v ->
                int n = parseIntSafe(v ?: '50')
                if (n < 20) {
                    return [concern: 3, note: 'Shallow delta chains — larger packs, faster access.']
                }
                return [concern: 0, note: 'Standard delta depth.']
            }
        ],
        [
            key: 'pack.windowMemory',
            group: GROUP_PACK,
            label: 'pack.windowMemory',
            defaultValue: '256m',
            description: 'Memory limit for repack delta search (per thread).',
            evaluate: { String v ->
                long bytes = parseGitByteSize(v ?: '256m')
                if (bytes > 0 && bytes < 64L * 1024 * 1024) {
                    return [concern: 3, note: 'Low memory cap — repack may be slower or produce larger packs.']
                }
                return [concern: 0, note: 'Adequate window memory for repack.']
            }
        ],
        [
            key: 'pack.packSizeLimit',
            group: GROUP_PACK,
            label: 'pack.packSizeLimit',
            defaultValue: '(unlimited)',
            description: 'Maximum size of a single packfile during repack.',
            evaluate: { String v ->
                if (!v?.trim()) {
                    return [concern: 0, note: 'No pack size cap — normal for most repos.']
                }
                long bytes = parseGitByteSize(v)
                if (bytes > 0 && bytes < 512L * 1024 * 1024) {
                    return [concern: 1, note: 'Small pack limit — may split large media packs; usually acceptable for content repos.']
                }
                return [concern: 0, note: 'Pack size limit configured.']
            }
        ],
        [
            key: 'core.compression',
            group: GROUP_CORE,
            label: 'core.compression',
            defaultValue: '6',
            description: 'Zlib compression level for loose objects and repack (0=none, 9=max).',
            evaluate: { String v ->
                if (!v?.trim()) {
                    return [concern: 0, note: 'Default compression (level 6).']
                }
                if (v == '0') {
                    return [concern: 3, note: 'No compression — faster CPU but larger .git on disk.']
                }
                int n = parseIntSafe(v)
                if (n >= 9) {
                    return [concern: 3, note: 'Max compression — smaller disk but slow GC/repack.']
                }
                return [concern: 0, note: 'Balanced compression level.']
            }
        ],
        [
            key: 'core.bigFileThreshold',
            group: GROUP_CORE,
            label: 'core.bigFileThreshold',
            defaultValue: '512m',
            description: 'Files larger than this are stored without delta compression.',
            evaluate: { String v ->
                long bytes = parseGitByteSize(v ?: '512m')
                if (bytes > 0 && bytes < 10L * 1024 * 1024) {
                    return [concern: 1, note: 'Low threshold — binary assets in /static-assets stored without delta (normal for CMS media).']
                }
                return [concern: 0, note: 'Large files bypass delta compression as expected.']
            }
        ],
        [
            key: 'core.deltaBaseCacheLimit',
            group: GROUP_CORE,
            label: 'core.deltaBaseCacheLimit',
            defaultValue: '256m',
            description: 'Cache size for delta bases during repack and pack-objects.',
            evaluate: { String v ->
                long bytes = parseGitByteSize(v ?: '256m')
                if (bytes > 0 && bytes < 64L * 1024 * 1024) {
                    return [concern: 3, note: 'Small delta cache — repack may be slower on large repos.']
                }
                return [concern: 0, note: 'Delta base cache looks adequate.']
            }
        ],
        [
            key: 'core.fsyncObjectFiles',
            group: GROUP_CORE,
            label: 'core.fsyncObjectFiles',
            defaultValue: 'false',
            description: 'fsync() after writing loose objects — safer on crash, slower writes.',
            evaluate: { String v ->
                if (v == 'true') {
                    return [concern: 3, note: 'fsync enabled — safer but slower Studio commits/pushes.']
                }
                return [concern: 0, note: 'Standard (no fsync on every object write).']
            }
        ],
        [
            key: 'core.preloadIndex',
            group: GROUP_INDEX,
            label: 'core.preloadIndex',
            defaultValue: 'true',
            description: 'Preload index into memory for git status and diff.',
            evaluate: { String v ->
                if (v == 'false') {
                    return [concern: 3, note: 'Index preload disabled — status may be slower on large trees.']
                }
                return [concern: 0, note: 'Index preload enabled (default).']
            }
        ],
        [
            key: 'core.untrackedCache',
            group: GROUP_INDEX,
            label: 'core.untrackedCache',
            defaultValue: 'false',
            recommendedValue: 'true',
            description: 'Cache untracked file scan results — speeds up status with many untracked files.',
            evaluate: { String v ->
                if (v != 'true') {
                    return [concern: 1, note: 'Untracked cache off — enable if status is slow and untracked files exist.']
                }
                return [concern: 0, note: 'Untracked cache enabled.']
            }
        ],
        [
            key: 'core.splitIndex',
            group: GROUP_INDEX,
            label: 'core.splitIndex',
            defaultValue: 'false',
            description: 'Split index for repositories with very large index files.',
            evaluate: { String v ->
                if (v == 'true') {
                    return [concern: 0, note: 'Split index enabled — good for large working trees.']
                }
                return [concern: 0, note: 'Split index off — enable if index file is huge.']
            }
        ],
        [
            key: 'core.multiPackIndex',
            group: GROUP_PACK,
            label: 'core.multiPackIndex',
            defaultValue: 'true',
            description: 'Multi-pack-index (MIDX) — speeds object lookups with many packfiles.',
            evaluate: { String v ->
                if (v == 'false') {
                    return [concern: 3, note: 'MIDX disabled — object lookups slower when many packs exist.']
                }
                return [concern: 0, note: 'MIDX enabled or default (recommended with multiple packs).']
            }
        ],
        [
            key: 'core.commitGraph',
            group: GROUP_CORE,
            label: 'core.commitGraph',
            defaultValue: 'true',
            description: 'Commit-graph file — accelerates history walks, reachability, and clone/fetch.',
            evaluate: { String v ->
                if (v == 'false') {
                    return [concern: 3, note: 'Commit-graph disabled — history operations may be slower.']
                }
                return [concern: 0, note: 'Commit-graph enabled or default.']
            }
        ],
        [
            key: 'index.threads',
            group: GROUP_INDEX,
            label: 'index.threads',
            defaultValue: '0',
            description: 'Parallel threads for index operations (0 = auto).',
            evaluate: { String v ->
                if (v == '1') {
                    return [concern: 3, note: 'Single-threaded index — may slow large status operations.']
                }
                return [concern: 0, note: 'Parallel index processing available.']
            }
        ],
        [
            key: 'feature.manyFiles',
            group: GROUP_INDEX,
            label: 'feature.manyFiles',
            defaultValue: 'false',
            recommendedValue: 'true',
            description: 'Optimize for repositories with very large numbers of files.',
            evaluate: { String v ->
                if (v == 'true') {
                    return [concern: 0, note: 'Many-files optimization enabled — good for large sandboxes.']
                }
                return [concern: 1, note: 'Consider enabling for sites with tens of thousands of files.']
            }
        ],
        [
            key: 'maintenance.auto',
            group: GROUP_MAINT,
            label: 'maintenance.auto',
            defaultValue: 'false',
            description: 'Automatic background maintenance tasks (Git 2.47+).',
            evaluate: { String v ->
                if (v == 'true') {
                    return [concern: 0, note: 'Background maintenance scheduled — helps keep repo healthy.']
                }
                return [concern: 0, note: 'Auto maintenance off — rely on manual GC or Studio schedules.']
            }
        ],
        [
            key: 'receive.unpackLimit',
            group: GROUP_CORE,
            label: 'receive.unpackLimit',
            defaultValue: '100',
            description: 'Max unpacked objects allowed on receive before rejecting push.',
            evaluate: { String v ->
                int n = parseIntSafe(v ?: '100')
                if (n > 0 && n < 20) {
                    return [concern: 3, note: 'Very low unpack limit — large Studio commits may fail on push.']
                }
                return [concern: 0, note: 'Standard receive unpack limit.']
            }
        ],
        [
            key: 'core.logAllRefUpdates',
            group: GROUP_GC,
            label: 'core.logAllRefUpdates',
            defaultValue: 'true',
            description: 'Keep reflogs for branch updates — enables recovery, uses extra disk.',
            evaluate: { String v ->
                if (v == 'false') {
                    return [concern: 3, note: 'Reflogs disabled — less disk but no recovery via reflog.']
                }
                return [concern: 0, note: 'Reflogs enabled (default).']
            }
        ]
    ]
}
