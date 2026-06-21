/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 */

export type RepoOptimizeRisk = 'safe' | 'moderate' | 'destructive';

export type RepoOptimizeOperation =
  | 'gcAuto'
  | 'gc'
  | 'gcAggressive'
  | 'repack'
  | 'repackFromPack'
  | 'repackAggressive'
  | 'prune'
  | 'reflogExpire'
  | 'fullOptimize';

export type RepoOptimizeOption = {
  id: RepoOptimizeOperation;
  label: string;
  command: string;
  summary: string;
  /** Short headline shown in the confirm dialog. */
  consequence: string;
  /** Why this operation is labeled moderate or destructive (not necessarily "data loss"). */
  whyRisky: string;
  /** What Git may permanently remove. */
  whatIsDestroyed: string;
  /** What is not touched — committed site content and branch history. */
  whatIsPreserved: string;
  /** Explicit answer on published content / commit history. */
  contentHistoryRisk: string;
  risk: RepoOptimizeRisk;
};

export const REPO_OPTIMIZE_OPTIONS: RepoOptimizeOption[] = [
  {
    id: 'gcAuto',
    label: 'GC (auto)',
    command: 'git gc --auto',
    summary: 'Lightweight maintenance; runs only when Git decides it is needed.',
    consequence: 'Routine housekeeping. Git runs this automatically in many workflows.',
    whyRisky: 'Low impact. Git skips work unless internal thresholds are met.',
    whatIsDestroyed:
      'Only Git objects that are already unreachable (not on any branch or tag) — and only if Git chooses to prune them during this run.',
    whatIsPreserved:
      'All commits on branches and tags, all files in those commits (including /site/ content), and all commit SHAs.',
    contentHistoryRisk:
      'No risk to committed site content or published history. Uncommitted or dangling Git objects may be pruned if Git decides to.',
    risk: 'safe'
  },
  {
    id: 'gc',
    label: 'GC (prune now)',
    command: 'git gc --prune=now',
    summary: 'Standard garbage collection with immediate pruning.',
    consequence: 'Repacks the repository and prunes unreachable objects immediately.',
    whyRisky:
      'Moderate because it holds the sandbox Git lock and prunes unreachable objects now instead of waiting. It does not rewrite reachable commit history.',
    whatIsDestroyed:
      'Unreachable loose Git objects: dangling commits (e.g. after a hard reset or deleted branch), orphaned blobs, and other objects not reachable from any ref.',
    whatIsPreserved:
      'Every commit still pointed to by a branch or tag, all file versions in that history, and all commit IDs. Your site XML, assets, and config on branches stay intact.',
    contentHistoryRisk:
      'No risk to committed site content on branches. You may lose unreferenced Git objects (recovery copies of old commits not on any branch). Studio may be slow while the sandbox lock is held.',
    risk: 'moderate'
  },
  {
    id: 'gcAggressive',
    label: 'GC (aggressive)',
    command: 'git gc --aggressive --prune=now',
    summary: 'Deep repack with aggressive delta compression.',
    consequence: 'Rewrites packfiles and prunes unreachable objects. Long-running on large repos.',
    whyRisky:
      'Labeled destructive because of duration, CPU/disk load, and sandbox lock time — not because it rewrites commit history. Packfiles are rebuilt; reachable commit SHAs and trees are unchanged.',
    whatIsDestroyed:
      'Same as standard GC: unreachable Git objects are pruned. Existing packfiles are replaced with newly compressed packs.',
    whatIsPreserved:
      'All commits, trees, and blobs reachable from branches/tags — including every version of site content in Git history. Commit hashes for reachable commits do not change.',
    contentHistoryRisk:
      'No risk to committed site content or branch history. Risk is operational (long lock, high I/O) plus loss of unreachable/dangling objects. Use Trim History separately if you need to remove content from history.',
    risk: 'destructive'
  },
  {
    id: 'repack',
    label: 'Repack (all loose)',
    command: 'git repack -a -d',
    summary: 'Pack all loose objects; remove redundant packs.',
    consequence: 'Consolidates loose objects into packfiles.',
    whyRisky:
      'Moderate disk churn and sandbox lock. Does not delete commits or change history — only reorganizes how Git stores objects on disk.',
    whatIsDestroyed: 'Redundant packfiles and loose object files after their contents are copied into new packs.',
    whatIsPreserved: 'All reachable commits, blobs, and trees. Site content and history are unchanged.',
    contentHistoryRisk: 'No risk to committed content or history. Temporary extra disk use while repacking.',
    risk: 'moderate'
  },
  {
    id: 'repackFromPack',
    label: 'Repack (from existing packs)',
    command: 'git repack -A -d',
    summary: 'Repack objects from existing packfiles into a new pack.',
    consequence: 'Consolidates packfiles; may require temporary disk space equal to the current pack size.',
    whyRisky:
      'Labeled destructive because it can need roughly 2× .git disk space until the old packs are removed, and it locks the sandbox for a long time on large repos. It does not alter commit history.',
    whatIsDestroyed: 'Old packfiles after their objects are rewritten into a new consolidated pack.',
    whatIsPreserved: 'All commits and file content reachable from refs. No commit SHAs or site files are removed.',
    contentHistoryRisk:
      'No risk to committed content or history. Risk is running out of disk space mid-operation on very large repositories.',
    risk: 'destructive'
  },
  {
    id: 'repackAggressive',
    label: 'Repack (aggressive delta)',
    command: 'git repack -a -d -f --depth=250 --window=250',
    summary: 'Full repack with maximum delta compression.',
    consequence: 'Very slow full repack with aggressive compression.',
    whyRisky:
      'Labeled destructive due to extreme CPU, I/O, and lock duration on large repos — not because it deletes site content. Rewrites packfiles only.',
    whatIsDestroyed: 'Previous packfiles and loose objects after recompression into new packs.',
    whatIsPreserved: 'All reachable commits, trees, blobs, and branch/tag refs. Site content in Git history is preserved.',
    contentHistoryRisk:
      'No risk to committed content or branch history. Operational risk only: long Studio git lock and heavy disk activity.',
    risk: 'destructive'
  },
  {
    id: 'prune',
    label: 'Prune (expire now)',
    command: 'git prune --expire=now',
    summary: 'Remove unreachable loose objects immediately.',
    consequence: 'Deletes loose Git objects that nothing points to.',
    whyRisky:
      'Moderate because it permanently removes unreachable objects immediately — including dangling commits you might still want to recover via reflog or fsck.',
    whatIsDestroyed:
      'Unreachable loose objects only (not objects inside packfiles until a later GC). Typical victims: dangling commits after reset, orphaned blobs, objects from deleted branches that are no longer referenced.',
    whatIsPreserved:
      'All objects reachable from branches and tags — your committed site content and full branch history remain.',
    contentHistoryRisk:
      'No risk to content on branches. You may permanently lose unreferenced Git objects (recovery copies). Does not remove commits that are still on a branch.',
    risk: 'moderate'
  },
  {
    id: 'reflogExpire',
    label: 'Expire all reflogs',
    command: 'git reflog expire --expire=now --all',
    summary: 'Clear all reflog entries for every ref.',
    consequence: 'Removes Git’s internal “undo” log for every branch and HEAD.',
    whyRisky:
      'Labeled destructive because it removes recovery paths: you cannot use reflog to restore a recently deleted branch, undo a hard reset, or find a “lost” commit that is no longer on any branch.',
    whatIsDestroyed:
      'Reflog entries only — Git’s local journal of where refs used to point. Reflogs are not part of published history and are not pushed to remotes.',
    whatIsPreserved:
      'Current branch and tag tips, all commits still referenced by those refs, and all site content in those commits. Commit history on branches is unchanged.',
    contentHistoryRisk:
      'No risk to committed site content on branches. You lose the ability to recover recent Git mistakes via reflog (e.g. “I reset HEAD yesterday and need that commit back”).',
    risk: 'destructive'
  },
  {
    id: 'fullOptimize',
    label: 'Full optimize (reflog + aggressive GC)',
    command: 'git reflog expire --expire=now --all && git gc --aggressive --prune=now',
    summary: 'Expire all reflogs, then run aggressive GC.',
    consequence: 'Highest-impact maintenance: clears reflogs, rewrites packs, and prunes unreachable objects.',
    whyRisky:
      'Combines reflog expiry (no recovery via reflog) with aggressive GC (long lock, pack rewrite, prune unreachable objects). Still does not rewrite reachable commit history.',
    whatIsDestroyed:
      'All reflog entries, unreachable Git objects, and old packfiles. Does not remove commits or files that remain on branches/tags.',
    whatIsPreserved:
      'All commits, files, and SHAs still reachable from branches and tags — your site sandbox content on branches is preserved.',
    contentHistoryRisk:
      'No risk to committed site content on branches. You may lose dangling/unreachable objects and all reflog-based recovery. For removing content from history, use Git log → Trim History (that rewrites history).',
    risk: 'destructive'
  }
];

export function getRepoOptimizeOption(id: RepoOptimizeOperation): RepoOptimizeOption | undefined {
  return REPO_OPTIMIZE_OPTIONS.find((option) => option.id === id);
}

export function requiresConfirmation(option: RepoOptimizeOption): boolean {
  return option.risk !== 'safe';
}
