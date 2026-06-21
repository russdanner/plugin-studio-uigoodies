/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 *
 * Threshold legend for Repository health — mirrors DevContentOpsRepoHealthThresholds.groovy
 * (CrafterCMS content sandbox profile, not typical source-code repos).
 */

export const REPO_HEALTH_PROFILE_LABEL = 'CrafterCMS content sandbox';

export type RepoHealthConcernLevelId = 'ok' | 'watch' | 'elevated' | 'critical';

export type RepoHealthConcernLevel = {
  id: RepoHealthConcernLevelId;
  label: string;
  scoreRange: string;
  summary: string;
};

export type RepoHealthMetricLegend = {
  id: string;
  label: string;
  description: string;
  warn: string;
  critical: string;
};

export type RepoHealthMetricGroupLegend = {
  id: string;
  title: string;
  summary: string;
  metrics: RepoHealthMetricLegend[];
};

function fmtCount(n: number): string {
  return n.toLocaleString('en-US');
}

function fmtBytes(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }
  if (bytes < 1024 * 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

function fmtKiB(kib: number): string {
  if (kib < 1024) {
    return `${fmtCount(kib)} KiB`;
  }
  return fmtBytes(kib * 1024);
}

export const REPO_HEALTH_CONCERN_LEVELS: RepoHealthConcernLevel[] = [
  {
    id: 'ok',
    label: 'OK',
    scoreRange: '0',
    summary: 'Value is below the watch threshold. No action needed for this metric.'
  },
  {
    id: 'watch',
    label: 'Watch',
    scoreRange: '3 – 9',
    summary: 'Value reached the warn threshold. Worth monitoring — common in busy sandboxes.'
  },
  {
    id: 'elevated',
    label: 'Elevated',
    scoreRange: '10 – 29',
    summary: 'Well above the warn threshold. Plan GC, repack, asset review, or history trim.'
  },
  {
    id: 'critical',
    label: 'Critical',
    scoreRange: '30+',
    summary: 'At or above the critical threshold. Prioritize remediation before performance degrades.'
  }
];

export const REPO_HEALTH_SCORING_NOTE =
  'Each metric and repository-config row receives a concern score. Below the warn threshold → 0. At or above critical → 30. Between warn and critical → scales from 3 upward (roughly 3× value ÷ warn). Overall concern is the highest score across all rows.';

export const REPO_HEALTH_INTRO =
  'These metrics follow git-sizer style analysis, tuned for CrafterCMS sandboxes: frequent author commits, XML content items, large static assets under /static-assets, and deeper folder trees than typical app repos.';

export const REPO_HEALTH_CONFIG_NOTE =
  'Repository configuration rows show Git settings and runtime object-store stats. Rows highlighted in amber use a non-recommended value (compare Current vs Recommended). Config rows use the same concern scoring when values exceed content thresholds.';

export const REPO_HEALTH_METRIC_GROUPS: RepoHealthMetricGroupLegend[] = [
  {
    id: 'overall',
    title: 'Overall repository size',
    summary: 'Totals across all reachable Git objects (commits, trees, blobs, tags, refs).',
    metrics: [
      {
        id: 'commits',
        label: 'Commits · count',
        description: 'Number of commit objects in history. Sandboxes accumulate many small commits from Studio saves and publishes.',
        warn: fmtCount(100_000),
        critical: fmtCount(500_000)
      },
      {
        id: 'commitTotalSize',
        label: 'Commits · total size',
        description: 'Combined compressed size of all commit objects (metadata + diffs).',
        warn: fmtBytes(500 * 1024 * 1024),
        critical: fmtBytes(2 * 1024 * 1024 * 1024)
      },
      {
        id: 'trees',
        label: 'Trees · count',
        description: 'Directory listing objects — one per folder snapshot in history.',
        warn: fmtCount(250_000),
        critical: fmtCount(1_000_000)
      },
      {
        id: 'treeTotalSize',
        label: 'Trees · total size',
        description: 'Combined size of all tree objects.',
        warn: fmtBytes(5 * 1024 * 1024 * 1024),
        critical: fmtBytes(20 * 1024 * 1024 * 1024)
      },
      {
        id: 'totalTreeEntries',
        label: 'Trees · total tree entries',
        description: 'Sum of file/folder entries across all trees. Grows with content item count and renames.',
        warn: fmtCount(5_000_000),
        critical: fmtCount(25_000_000)
      },
      {
        id: 'blobs',
        label: 'Blobs · count',
        description: 'Unique file versions stored in Git (every revision of every file).',
        warn: fmtCount(250_000),
        critical: fmtCount(1_000_000)
      },
      {
        id: 'totalBlobSize',
        label: 'Blobs · total size',
        description: 'Combined size of all blob objects. Dominated by images, video, and PDFs in static assets.',
        warn: fmtBytes(10 * 1024 * 1024 * 1024),
        critical: fmtBytes(50 * 1024 * 1024 * 1024)
      },
      {
        id: 'tags',
        label: 'Annotated tags · count',
        description: 'Signed or annotated tag objects (uncommon in CMS sandboxes unless used for releases).',
        warn: fmtCount(5_000),
        critical: fmtCount(25_000)
      },
      {
        id: 'refs',
        label: 'References · count',
        description: 'Branches, remote-tracking refs, and tags. Crafter sites often have many branch namespaces.',
        warn: fmtCount(250),
        critical: fmtCount(1_000)
      }
    ]
  },
  {
    id: 'biggest',
    title: 'Biggest objects',
    summary: 'Single largest instances — often the best clue for oversized assets or accidental bulk commits.',
    metrics: [
      {
        id: 'maxCommitSize',
        label: 'Commits · maximum size',
        description: 'Largest individual commit object. Huge commits may indicate bulk imports or binary dumps in one save.',
        warn: fmtBytes(256 * 1024),
        critical: fmtBytes(2 * 1024 * 1024)
      },
      {
        id: 'maxCommitParents',
        label: 'Commits · maximum parents',
        description: 'Merge commits with many parents (rare in CMS workflows; high values may indicate corruption or unusual merges).',
        warn: fmtCount(10),
        critical: fmtCount(30)
      },
      {
        id: 'maxTreeEntries',
        label: 'Trees · maximum entries',
        description: 'Deepest single directory listing. Very flat sites with thousands of siblings in one folder trigger this.',
        warn: fmtCount(500),
        critical: fmtCount(5_000)
      },
      {
        id: 'largestBlob',
        label: 'Blobs · maximum size',
        description: 'Largest single file version in history. Multi-MB images and video are expected; hundreds of MB may need asset policy review.',
        warn: fmtBytes(100 * 1024 * 1024),
        critical: fmtBytes(500 * 1024 * 1024)
      }
    ]
  },
  {
    id: 'history',
    title: 'History structure',
    summary: 'How deep and chained the revision graph is.',
    metrics: [
      {
        id: 'maxHistoryDepth',
        label: 'Maximum history depth',
        description: 'Longest ancestor chain from HEAD. Long-lived sandboxes with daily edits accumulate depth over years.',
        warn: fmtCount(100_000),
        critical: fmtCount(500_000)
      },
      {
        id: 'maxTagDepth',
        label: 'Maximum tag depth',
        description: 'Deepest chain of annotated tags pointing to other tags.',
        warn: fmtCount(5),
        critical: fmtCount(20)
      }
    ]
  },
  {
    id: 'checkout',
    title: 'Biggest checkout (HEAD)',
    summary: 'Working-tree shape at the current HEAD commit — what Studio and the preview engine see on disk.',
    metrics: [
      {
        id: 'checkoutDirectories',
        label: 'Number of directories',
        description: 'Distinct folder paths in the current tree. Deep IA and many content-type folders increase this.',
        warn: fmtCount(10_000),
        critical: fmtCount(50_000)
      },
      {
        id: 'checkoutMaxPathDepth',
        label: 'Maximum path depth',
        description: 'Folder nesting depth (path segments). Crafter page folders like /site/website/about/index.xml add depth.',
        warn: fmtCount(20),
        critical: fmtCount(40)
      },
      {
        id: 'checkoutMaxPathLength',
        label: 'Maximum path length',
        description: 'Longest full path string in characters. Very long names or deep nesting can hit OS path limits.',
        warn: fmtCount(350),
        critical: fmtCount(800)
      },
      {
        id: 'checkoutFileCount',
        label: 'Number of files',
        description: 'Regular files at HEAD (XML content, templates, static assets).',
        warn: fmtCount(200_000),
        critical: fmtCount(1_000_000)
      },
      {
        id: 'checkoutTotalFileSize',
        label: 'Total size of files',
        description: 'Sum of file sizes at HEAD (uncompressed working-tree footprint, not .git pack size).',
        warn: fmtBytes(20 * 1024 * 1024 * 1024),
        critical: fmtBytes(100 * 1024 * 1024 * 1024)
      },
      {
        id: 'checkoutSymlinks',
        label: 'Number of symlinks',
        description: 'Symbolic links in the tree (unusual in standard Crafter projects).',
        warn: fmtCount(500),
        critical: fmtCount(5_000)
      },
      {
        id: 'checkoutSubmodules',
        label: 'Number of submodules',
        description: 'Git submodule links (gitlink entries). Rare unless submodules were added manually.',
        warn: fmtCount(10),
        critical: fmtCount(50)
      }
    ]
  },
  {
    id: 'disk',
    title: 'On-disk footprint',
    summary: 'Physical .git directory size — what consumes disk on the authoring server.',
    metrics: [
      {
        id: 'gitDirSize',
        label: 'Repository disk size (.git)',
        description: 'Total bytes under the .git directory including objects, refs, and logs.',
        warn: fmtBytes(5 * 1024 * 1024 * 1024),
        critical: fmtBytes(25 * 1024 * 1024 * 1024)
      },
      {
        id: 'packSize',
        label: 'Pack file size',
        description: 'Compressed packfiles under objects/pack. Primary storage after GC/repack.',
        warn: fmtBytes(4 * 1024 * 1024 * 1024),
        critical: fmtBytes(20 * 1024 * 1024 * 1024)
      },
      {
        id: 'looseSize',
        label: 'Loose object size',
        description: 'Unpacked objects under objects/ (excluding pack). High values mean GC has not run recently.',
        warn: fmtBytes(1 * 1024 * 1024 * 1024),
        critical: fmtBytes(5 * 1024 * 1024 * 1024)
      }
    ]
  },
  {
    id: 'runtime',
    title: 'Runtime object store (configuration tab)',
    summary: 'Derived from .git/objects layout — also shown under Repository configuration.',
    metrics: [
      {
        id: 'count-objects.loose',
        label: 'Loose objects',
        description: 'Count of loose object files. Frequent Studio commits create loose objects until GC packs them.',
        warn: fmtCount(5_000),
        critical: fmtCount(25_000)
      },
      {
        id: 'count-objects.loose-size',
        label: 'Loose object size',
        description: 'Approximate KiB used by loose objects (from disk scan).',
        warn: fmtKiB(512 * 1024),
        critical: fmtKiB(2 * 1024 * 1024)
      },
      {
        id: 'count-objects.packs',
        label: 'Pack files',
        description: 'Number of .pack files. Many packs slow object lookups — repack consolidates them.',
        warn: fmtCount(12),
        critical: fmtCount(30)
      }
    ]
  }
];
