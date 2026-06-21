package plugins.org.rd.plugin.uigoodies

/**
 * GitSizer-style warn/critical thresholds tuned for CrafterCMS content sandboxes:
 * frequent author commits, small XML + large static assets, and deeper IA folder trees.
 * (Not calibrated for typical source-code repositories.)
 */
final class DevContentOpsRepoHealthThresholds {

    static final String PROFILE_ID = 'content'
    static final String PROFILE_LABEL = 'CrafterCMS content sandbox'

    private DevContentOpsRepoHealthThresholds() {}

    // --- Overall repository size ---
    /** Authoring churn: many small commits per edit session. */
    static final long COMMITS_WARN = 100_000L
    static final long COMMITS_CRITICAL = 500_000L

    static final long COMMIT_BYTES_WARN = 500L * 1024 * 1024
    static final long COMMIT_BYTES_CRITICAL = 2L * 1024 * 1024 * 1024

    static final long TREES_WARN = 250_000L
    static final long TREES_CRITICAL = 1_000_000L

    static final long TREE_BYTES_WARN = 5L * 1024 * 1024 * 1024
    static final long TREE_BYTES_CRITICAL = 20L * 1024 * 1024 * 1024

    static final long TREE_ENTRIES_WARN = 5_000_000L
    static final long TREE_ENTRIES_CRITICAL = 25_000_000L

    static final long BLOBS_WARN = 250_000L
    static final long BLOBS_CRITICAL = 1_000_000L

    /** Total blob bytes; static-assets dominate. */
    static final long BLOB_BYTES_WARN = 10L * 1024 * 1024 * 1024
    static final long BLOB_BYTES_CRITICAL = 50L * 1024 * 1024 * 1024

    static final long TAGS_WARN = 5_000L
    static final long TAGS_CRITICAL = 25_000L

    /** Crafter sites accumulate many branch/ref namespaces. */
    static final long REFS_WARN = 250L
    static final long REFS_CRITICAL = 1_000L

    // --- Biggest objects ---
    static final long MAX_COMMIT_BYTES_WARN = 256L * 1024
    static final long MAX_COMMIT_BYTES_CRITICAL = 2L * 1024 * 1024

    /** Multi-MB images and videos are expected in /static-assets. */
    static final long MAX_BLOB_BYTES_WARN = 100L * 1024 * 1024
    static final long MAX_BLOB_BYTES_CRITICAL = 500L * 1024 * 1024

    static final long MAX_TREE_ENTRIES_WARN = 500L
    static final long MAX_TREE_ENTRIES_CRITICAL = 5_000L

    static final int MAX_COMMIT_PARENTS_WARN = 10
    static final int MAX_COMMIT_PARENTS_CRITICAL = 30

    // --- History structure ---
    static final long HISTORY_DEPTH_WARN = 100_000L
    static final long HISTORY_DEPTH_CRITICAL = 500_000L

    static final int TAG_DEPTH_WARN = 5
    static final int TAG_DEPTH_CRITICAL = 20

    // --- Biggest checkout (HEAD) ---
    static final long CHECKOUT_DIRS_WARN = 10_000L
    static final long CHECKOUT_DIRS_CRITICAL = 50_000L

    static final long CHECKOUT_DEPTH_WARN = 20L
    static final long CHECKOUT_DEPTH_CRITICAL = 40L

    static final long CHECKOUT_PATH_LEN_WARN = 350L
    static final long CHECKOUT_PATH_LEN_CRITICAL = 800L

    static final long CHECKOUT_FILES_WARN = 200_000L
    static final long CHECKOUT_FILES_CRITICAL = 1_000_000L

    static final long CHECKOUT_BYTES_WARN = 20L * 1024 * 1024 * 1024
    static final long CHECKOUT_BYTES_CRITICAL = 100L * 1024 * 1024 * 1024

    static final long CHECKOUT_SYMLINKS_WARN = 500L
    static final long CHECKOUT_SYMLINKS_CRITICAL = 5_000L

    static final long CHECKOUT_SUBMODULES_WARN = 10L
    static final long CHECKOUT_SUBMODULES_CRITICAL = 50L

    // --- On-disk footprint ---
    static final long GIT_DIR_WARN = 5L * 1024 * 1024 * 1024
    static final long GIT_DIR_CRITICAL = 25L * 1024 * 1024 * 1024

    static final long PACK_BYTES_WARN = 4L * 1024 * 1024 * 1024
    static final long PACK_BYTES_CRITICAL = 20L * 1024 * 1024 * 1024

    static final long LOOSE_BYTES_WARN = 1L * 1024 * 1024 * 1024
    static final long LOOSE_BYTES_CRITICAL = 5L * 1024 * 1024 * 1024

    // --- Runtime object store (count-objects style) ---
    static final long LOOSE_OBJECT_COUNT_WARN = 5_000L
    static final long LOOSE_OBJECT_COUNT_CRITICAL = 25_000L

    /** Values in KiB (matches countObjectsFromDisk). */
    static final long LOOSE_OBJECT_KIB_WARN = 512L * 1024
    static final long LOOSE_OBJECT_KIB_CRITICAL = 2L * 1024 * 1024

    static final long PACK_FILE_COUNT_WARN = 12L
    static final long PACK_FILE_COUNT_CRITICAL = 30L

    static int concernThreshold(long value, long warn, long critical) {
        if (value >= critical) {
            return 30
        }
        if (value >= warn) {
            return Math.max(1, (int) Math.ceil(3.0 * value / warn))
        }
        return 0
    }
}
