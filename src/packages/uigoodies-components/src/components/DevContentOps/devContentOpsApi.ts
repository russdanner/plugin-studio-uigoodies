/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 */

import { get, postJSON } from '@craftercms/studio-ui/utils/ajax';
import { map } from 'rxjs/operators';

export type GitCommit = {
  id: string;
  shortId: string;
  parents: string[];
  author?: string;
  email?: string;
  date: string;
  subject: string;
  body?: string;
  processed: boolean;
};

export type CommitFileChange = {
  changeType: string;
  path: string;
  oldPath?: string;
  newPath?: string;
};

export type CommitFilesResponse = {
  commitId: string;
  files: CommitFileChange[];
  total: number;
  changeCounts?: Record<string, number>;
  skip: number;
  limit: number;
  hasMore: boolean;
  nextSkip: number;
};

export type DiffLine = {
  type: 'add' | 'remove' | 'context' | 'meta';
  content: string;
};

export type FileDiff = {
  changeType: string;
  path: string;
  oldPath?: string;
  newPath?: string;
  diff: string;
  lines: DiffLine[];
};

export type PatchSelection = {
  commitId: string;
  shortId?: string;
  subject?: string;
  path?: string;
  changeType?: string;
};

export type RepoStatus = {
  siteId: string;
  branch: string;
  sandboxBranch?: string;
  branches: string[];
  headCommitId?: string;
  branchHeadCommitId?: string;
  lastProcessedCommitId?: string;
  unprocessedCount?: number;
  gitStatusOk?: boolean;
  workTreeClean?: boolean | null;
};

export type WorkTreeFile = {
  path: string;
  status: string;
  staged?: boolean;
  conflict?: boolean;
  stagedStatus?: string;
  workTreeStatus?: string;
};

export type WorkTreeResponse = RepoStatus & {
  success?: boolean;
  repoPath?: string;
  conflictCount?: number;
  hasChanges?: boolean;
  files?: WorkTreeFile[];
};

export type BlobStoreMapping = {
  publishingTarget: string;
  storeTarget: string;
  prefix?: string;
};

export type BlobStoreConfig = {
  id: string;
  type: string;
  pattern: string;
  readOnly?: boolean;
  mappings: BlobStoreMapping[];
  active?: boolean;
  treeRoot?: string;
};

export type BlobAssetPresence = {
  inRepo: boolean;
  inPreview: boolean;
  inStaging: boolean;
  inLive: boolean;
  stagingConfigured?: boolean;
  liveConfigured?: boolean;
};

export type BlobStoreTreeEntry = {
  name: string;
  path: string;
  folder: boolean;
  repoPointerPath?: string;
  presence?: BlobAssetPresence;
};

export type BlobStoreOverview = {
  success?: boolean;
  configured: boolean;
  configPath?: string;
  configPresent?: boolean;
  stores: BlobStoreConfig[];
  activeStoreIds?: string[];
  stagingEnabled?: boolean;
  stagingTarget?: string;
  liveTarget?: string;
  publishedRepositoryExists?: boolean;
};

export type BlobStoreChildrenResponse = {
  success?: boolean;
  storeId: string;
  parentPath: string;
  entries: BlobStoreTreeEntry[];
};

export type BlobStoreSyncResult = {
  success?: boolean;
  target?: string;
  publishingTarget?: string;
  storeId?: string;
  syncedCount?: number;
  failedCount?: number;
  syncedPaths?: string[];
  failedPaths?: string[];
  message?: string;
};

export type ProcessedCommitUpdate = {
  success?: boolean;
  error?: string;
  commitId?: string;
  message?: string;
};

export type FilterFileResult = {
  success?: boolean;
  error?: string;
  inStudio?: boolean;
  mode?: 'cli' | string;
  path?: string;
  repoPath?: string;
  headCommitId?: string;
  lastProcessedCommitId?: string;
  message?: string;
  hint?: string;
  warning?: string;
  suggestedCommand?: string;
  cliScript?: string;
  command?: string;
  output?: string;
  cliBlocked?: boolean;
  rewrittenRefs?: string[];
  processedCommitUpdate?: ProcessedCommitUpdate;
};

export type GitLogOrder = 'asc' | 'desc';

export type GitLogResponse = {
  siteId?: string;
  branch: string;
  headCommitId: string;
  commits: GitCommit[];
  skip: number;
  limit: number;
  hasMore: boolean;
  nextSkip: number;
  order?: GitLogOrder;
};

/** Coerce API values to plain strings (Studio may serialize Java/Groovy strings as objects). */
export function apiText(value: unknown): string {
  if (value == null) {
    return '';
  }
  if (typeof value === 'string') {
    return value;
  }
  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }
  if (typeof value === 'object') {
    const obj = value as Record<string, unknown>;
    if (typeof obj.value === 'string') {
      return obj.value;
    }
    if (Array.isArray(obj.values)) {
      return obj.values.map((v) => apiText(v)).join('');
    }
    if (typeof obj.strings === 'string') {
      return obj.strings;
    }
    if (Array.isArray(obj.strings)) {
      return obj.strings.map((v) => apiText(v)).join('');
    }
    if (typeof obj.bytes === 'string') {
      return obj.bytes;
    }
  }
  return String(value);
}

function normalizeCommit(commit: GitCommit): GitCommit {
  return {
    ...commit,
    id: apiText(commit.id),
    shortId: apiText(commit.shortId),
    author: commit.author ? apiText(commit.author) : commit.author,
    email: commit.email ? apiText(commit.email) : commit.email,
    date: apiText(commit.date),
    subject: apiText(commit.subject),
    body: commit.body ? apiText(commit.body) : commit.body
  };
}

function normalizeFileDiff(diff: FileDiff): FileDiff {
  return {
    ...diff,
    changeType: apiText(diff.changeType),
    path: apiText(diff.path),
    oldPath: diff.oldPath ? apiText(diff.oldPath) : diff.oldPath,
    newPath: diff.newPath ? apiText(diff.newPath) : diff.newPath,
    diff: apiText(diff.diff),
    lines: (diff.lines ?? []).map((line) => ({
      ...line,
      content: apiText(line.content)
    }))
  };
}

function pluginUrl(script: string, siteId: string, query = ''): string {
  const base =
    '/studio/api/2/plugin/script/plugins/org/rd/plugin/uigoodies/' +
    script +
    '?siteId=' +
    encodeURIComponent(siteId);
  return query ? base + '&' + query : base;
}

/** Reject responses scoped to a different site than the selected project. */
export function assertSiteScope<T extends { siteId?: string }>(expectedSiteId: string, data: T): T {
  const responseSiteId = data.siteId ? apiText(data.siteId) : '';
  if (responseSiteId && responseSiteId !== expectedSiteId) {
    throw new Error(`API response site mismatch: expected "${expectedSiteId}", got "${responseSiteId}"`);
  }
  return data;
}

function isAjaxEnvelope(obj: Record<string, unknown>): boolean {
  return 'response' in obj && ('status' in obj || 'xhr' in obj);
}

function isDevContentOpsPayload(obj: Record<string, unknown>): boolean {
  return (
    'commits' in obj ||
    ('siteId' in obj && 'branches' in obj) ||
    ('id' in obj && 'subject' in obj) ||
    'diff' in obj ||
    'patch' in obj ||
    'content' in obj ||
    'success' in obj ||
    'fileDiffs' in obj ||
    ('files' in obj && 'total' in obj)
  );
}

function unwrapPluginResponse<T>(raw: unknown): T {
  let current: unknown = raw;

  for (let depth = 0; depth < 8; depth++) {
    if (!current || typeof current !== 'object') {
      break;
    }
    const obj = current as Record<string, unknown>;

    if (isAjaxEnvelope(obj)) {
      current = obj.response;
      continue;
    }

    if (typeof obj.code === 'number' && obj.code >= 1000) {
      throw new Error(String(obj.message || 'DevContentOps API error'));
    }

    if ('result' in obj && obj.result != null && typeof obj.result === 'object') {
      const result = obj.result as Record<string, unknown>;
      if (!isDevContentOpsPayload(obj) || isDevContentOpsPayload(result)) {
        current = obj.result;
        continue;
      }
    }

    if (
      'response' in obj &&
      obj.response != null &&
      typeof obj.response === 'object' &&
      !isDevContentOpsPayload(obj)
    ) {
      current = obj.response;
      continue;
    }

    if (isDevContentOpsPayload(obj)) {
      break;
    }

    break;
  }

  if (!current || typeof current !== 'object') {
    throw new Error('Empty response from DevContentOps API');
  }

  const payload = current as T & { error?: string; hint?: string };
  const err = payload.error;
  if (err) {
    const hint = payload.hint;
    const message = apiText(err);
    const hintText = hint ? apiText(hint) : '';
    throw new Error(hintText ? `${message} (${hintText})` : message);
  }
  return payload as T;
}

function pluginGet<T extends { siteId?: string }>(expectedSiteId: string, url: string) {
  return get<T>(url).pipe(
    map((r) => assertSiteScope(expectedSiteId, unwrapPluginResponse<T>(r)))
  );
}

export function fetchDevContentOpsStatus(siteId: string, branch?: string) {
  const q = 'action=status' + (branch ? '&branch=' + encodeURIComponent(branch) : '');
  return pluginGet<RepoStatus>(siteId, pluginUrl('dev-content-ops-git', siteId, q)).pipe(
    map((data) =>
      assertSiteScope(siteId, {
        ...data,
        siteId: apiText(data.siteId) || siteId,
        branch: apiText(data.branch),
        sandboxBranch: apiText(data.sandboxBranch),
        headCommitId: apiText(data.headCommitId),
        branchHeadCommitId: apiText(data.branchHeadCommitId),
        lastProcessedCommitId: apiText(data.lastProcessedCommitId),
        gitStatusOk: data.gitStatusOk,
        workTreeClean: data.workTreeClean
      })
    )
  );
}

export function fetchWorkTree(siteId: string, branch?: string) {
  let q = 'action=workTree';
  if (branch) {
    q += '&branch=' + encodeURIComponent(branch);
  }
  return pluginGet<WorkTreeResponse>(siteId, pluginUrl('dev-content-ops-git', siteId, q)).pipe(
    map((data) =>
      assertSiteScope(siteId, {
        ...data,
        siteId: apiText(data.siteId) || siteId,
        branch: apiText(data.branch),
        sandboxBranch: apiText(data.sandboxBranch),
        headCommitId: apiText(data.headCommitId),
        branchHeadCommitId: apiText(data.branchHeadCommitId),
        lastProcessedCommitId: apiText(data.lastProcessedCommitId),
        repoPath: apiText(data.repoPath),
        files: (data.files ?? []).map((file) => ({
          path: apiText(file.path),
          status: apiText(file.status),
          staged: Boolean(file.staged),
          conflict: Boolean(file.conflict),
          stagedStatus: apiText(file.stagedStatus),
          workTreeStatus: apiText(file.workTreeStatus)
        }))
      })
    )
  );
}

export function fetchWorkTreeDiff(
  siteId: string,
  path: string,
  mode: 'unstaged' | 'staged' = 'unstaged'
) {
  const q =
    'action=workTreeDiff&path=' +
    encodeURIComponent(path) +
    '&mode=' +
    encodeURIComponent(mode);
  return pluginGet<{
    from: string;
    to: string;
    path?: string;
    diff: string;
    files: CommitFileChange[];
    fileDiffs: FileDiff[];
  }>(siteId, pluginUrl('dev-content-ops-git', siteId, q));
}

export function postWorkTreeStage(siteId: string, opts: { paths?: string[]; all?: boolean }) {
  return postDevContentOpsAction<{ success: boolean; message?: string; stagedCount?: number }>(siteId, {
    action: 'workTreeStage',
    paths: opts.paths ?? [],
    all: opts.all ?? false
  });
}

export function postWorkTreeUnstage(siteId: string, opts: { paths?: string[]; all?: boolean }) {
  return postDevContentOpsAction<{ success: boolean; message?: string; unstagedCount?: number }>(siteId, {
    action: 'workTreeUnstage',
    paths: opts.paths ?? [],
    all: opts.all ?? false
  });
}

export function postWorkTreeDiscard(siteId: string, opts: { paths?: string[]; all?: boolean }) {
  return postDevContentOpsAction<{ success: boolean; message?: string; discardedCount?: number }>(siteId, {
    action: 'workTreeDiscard',
    paths: opts.paths ?? [],
    all: opts.all ?? false
  });
}

export function postWorkTreeClean(
  siteId: string,
  opts: { paths?: string[]; allUntracked?: boolean }
) {
  return postDevContentOpsAction<{ success: boolean; message?: string; cleanedCount?: number }>(siteId, {
    action: 'workTreeClean',
    paths: opts.paths ?? [],
    allUntracked: opts.allUntracked ?? false
  });
}

export function postWorkTreeCommit(siteId: string, message: string) {
  return postDevContentOpsAction<{ success: boolean; message?: string; commitId?: string; shortId?: string }>(
    siteId,
    { action: 'workTreeCommit', message }
  );
}

export function postWorkTreeResolveConflict(
  siteId: string,
  path: string,
  strategy: 'ours' | 'theirs'
) {
  return postDevContentOpsAction<{ success: boolean; message?: string; path?: string }>(siteId, {
    action: 'workTreeResolveConflict',
    path,
    strategy
  });
}

export function postWorkTreeResetHard(siteId: string) {
  return postDevContentOpsAction<{ success: boolean; message?: string }>(siteId, {
    action: 'workTreeResetHard',
    confirmed: true
  });
}

export function fetchGitLog(
  siteId: string,
  opts: {
    branch: string;
    skip: number;
    limit: number;
    since?: number;
    until?: number;
    order?: GitLogOrder;
  }
) {
  const order = opts.order === 'asc' ? 'asc' : 'desc';
  let q =
    'action=log&branch=' +
    encodeURIComponent(opts.branch) +
    '&skip=' +
    opts.skip +
    '&limit=' +
    opts.limit +
    '&order=' +
    order;
  if (opts.since) {
    q += '&since=' + opts.since;
  }
  if (opts.until) {
    q += '&until=' + opts.until;
  }
  return pluginGet<GitLogResponse>(siteId, pluginUrl('dev-content-ops-git', siteId, q)).pipe(
    map((data) => ({
      ...data,
      branch: apiText(data.branch),
      headCommitId: apiText(data.headCommitId),
      commits: (data.commits ?? []).map(normalizeCommit)
    }))
  );
}

export function fetchGitCommitDetail(siteId: string, commitId: string) {
  return pluginGet<GitCommit>(
    siteId,
    pluginUrl('dev-content-ops-git', siteId, 'action=commit&commitId=' + encodeURIComponent(commitId))
  ).pipe(map(normalizeCommit));
}

export function fetchCommitFiles(
  siteId: string,
  commitId: string,
  opts: { skip: number; limit: number }
) {
  const q =
    'action=commitFiles&commitId=' +
    encodeURIComponent(commitId) +
    '&skip=' +
    opts.skip +
    '&limit=' +
    opts.limit;
  return pluginGet<CommitFilesResponse>(siteId, pluginUrl('dev-content-ops-git', siteId, q)).pipe(
    map((data) => ({
      ...data,
      commitId: apiText(data.commitId),
      files: (data.files ?? []).map((file) => ({
        ...file,
        changeType: apiText(file.changeType),
        path: apiText(file.path),
        oldPath: file.oldPath ? apiText(file.oldPath) : file.oldPath,
        newPath: file.newPath ? apiText(file.newPath) : file.newPath
      })),
      changeCounts: data.changeCounts
        ? Object.fromEntries(
            Object.entries(data.changeCounts).map(([key, value]) => [apiText(key), Number(value) || 0])
          )
        : undefined
    }))
  );
}

export function fetchGitFileContent(siteId: string, commitId: string, path: string) {
  return pluginGet<{ content: string; path: string; binary?: boolean; message?: string }>(
    siteId,
    pluginUrl(
      'dev-content-ops-git',
      siteId,
      'action=file&commitId=' + encodeURIComponent(commitId) + '&path=' + encodeURIComponent(path)
    )
  ).pipe(
    map((data) => ({
      ...data,
      path: apiText(data.path),
      content: apiText(data.content),
      message: data.message ? apiText(data.message) : data.message
    }))
  );
}

export function fetchGitDiff(siteId: string, fromRef: string, toRef: string, path?: string) {
  let q =
    'action=diff&from=' + encodeURIComponent(fromRef) + '&to=' + encodeURIComponent(toRef);
  if (path) {
    q += '&path=' + encodeURIComponent(path);
  }
  return pluginGet<{
    diff: string;
    files: CommitFileChange[];
    fileDiffs: FileDiff[];
    from: string;
    to: string;
    path?: string;
  }>(siteId, pluginUrl('dev-content-ops-git', siteId, q)).pipe(
    map((data) => ({
      ...data,
      diff: apiText(data.diff),
      from: apiText(data.from),
      to: apiText(data.to),
      path: data.path ? apiText(data.path) : data.path,
      fileDiffs: (data.fileDiffs ?? []).map(normalizeFileDiff)
    }))
  );
}

export function fetchGitPatch(siteId: string, from: string, to: string) {
  return pluginGet<{ patch: string; commitCount: number }>(
    siteId,
    pluginUrl(
      'dev-content-ops-git',
      siteId,
      'action=patch&from=' + encodeURIComponent(from) + '&to=' + encodeURIComponent(to)
    )
  ).pipe(map((data) => ({ ...data, patch: apiText(data.patch) })));
}

export function buildPatchFromSelection(siteId: string, selections: PatchSelection[]) {
  return postJSON(pluginUrl('dev-content-ops-git', siteId), {
    siteId,
    action: 'buildPatch',
    selections
  }).pipe(
    map((r) => {
      const data = unwrapPluginResponse<{ patch: string; selectionCount: number }>(r);
      return { ...data, patch: apiText(data.patch) };
    })
  );
}

export function postDevContentOpsAction<T = Record<string, unknown>>(siteId: string, body: Record<string, unknown>) {
  return postJSON(pluginUrl('dev-content-ops-git', siteId), { siteId, ...body }).pipe(
    map((r) => {
      const data = unwrapPluginResponse<T & { siteId?: string }>(r);
      assertSiteScope(siteId, data as { siteId?: string });
      return data as T;
    })
  );
}

export type RepoHealthMetric = {
  id: string;
  group?: string;
  label: string;
  value: string | number;
  concern: number;
  objectId?: string;
};

export type RepoConfigSetting = {
  key: string;
  group: string;
  label: string;
  value: string;
  defaultValue?: string;
  recommendedValue?: string;
  deviatesFromRecommended?: boolean;
  source?: string;
  sourceDetail?: string;
  description?: string;
  performanceNote?: string;
  concern: number;
};

export type RepoHealthReport = {
  success: boolean;
  mode?: 'cli' | 'git-sizer';
  siteId?: string;
  repoPath?: string;
  overallConcern?: number;
  metrics?: RepoHealthMetric[];
  repoConfig?: {
    settings?: RepoConfigSetting[];
  };
  thresholdProfile?: string;
  thresholdProfileLabel?: string;
  summary?: string;
  error?: string;
  message?: string;
};

export type { RepoOptimizeOperation } from './repoOptimizeOptions';

export function fetchRepoHealth(siteId: string) {
  return pluginGet<RepoHealthReport>(siteId, pluginUrl('dev-content-ops-git', siteId, 'action=repoHealth'));
}

export function postOptimizeRepo(siteId: string, operation: import('./repoOptimizeOptions').RepoOptimizeOperation) {
  return postDevContentOpsAction<{
    success: boolean;
    operation: string;
    mode?: string;
    command?: string;
    message?: string;
    error?: string;
    hint?: string;
  }>(siteId, {
    action: 'optimizeRepo',
    operation
  });
}

export function postUpdateItemStateBits(
  siteId: string,
  path: string,
  onMask: number,
  offMask: number
) {
  return postDevContentOpsAction<{ success: boolean; path: string; onMask: number; offMask: number }>(siteId, {
    action: 'updateItemStateBits',
    path,
    onMask,
    offMask
  });
}

export function postUpdateItemStateBitsBulk(
  siteId: string,
  paths: string[],
  onMask: number,
  offMask: number
) {
  return postDevContentOpsAction<{ success: boolean; count: number; onMask: number; offMask: number }>(siteId, {
    action: 'updateItemStateBitsBulk',
    paths,
    onMask,
    offMask
  });
}

export type GitRefRow = {
  name: string;
  commit?: string;
  subject?: string;
  current?: boolean;
  remote?: string;
};

export type GitRefsResponse = {
  siteId?: string;
  success?: boolean;
  currentBranch?: string;
  sandboxBranch?: string;
  remotes?: string[];
  branches?: GitRefRow[];
  tags?: GitRefRow[];
  remoteBranches?: GitRefRow[];
};

export function fetchGitRefs(siteId: string) {
  return pluginGet<GitRefsResponse>(siteId, pluginUrl('dev-content-ops-git', siteId, 'action=refs'));
}

export function postCreateBranch(
  siteId: string,
  opts: { name: string; startPoint?: string; force?: boolean }
) {
  return postDevContentOpsAction<{ success: boolean; message?: string; refName?: string }>(siteId, {
    action: 'createBranch',
    ...opts
  });
}

export function postCreateTag(
  siteId: string,
  opts: { name: string; commit?: string; message?: string; annotated?: boolean }
) {
  return postDevContentOpsAction<{ success: boolean; message?: string; refName?: string }>(siteId, {
    action: 'createTag',
    ...opts
  });
}

export function postDeleteBranch(
  siteId: string,
  opts: {
    name: string;
    force?: boolean;
    deleteLocal?: boolean;
    deleteRemote?: boolean;
    remote?: string;
  }
) {
  return postDevContentOpsAction<{ success: boolean; message?: string; refName?: string }>(siteId, {
    action: 'deleteBranch',
    ...opts
  });
}

export function postDeleteTag(
  siteId: string,
  opts: { name: string; deleteLocal?: boolean; deleteRemote?: boolean; remote?: string }
) {
  return postDevContentOpsAction<{ success: boolean; message?: string; refName?: string }>(siteId, {
    action: 'deleteTag',
    ...opts
  });
}

export type DatabaseAccessResponse = {
  siteId?: string;
  success?: boolean;
  systemAdmin?: boolean;
  username?: string;
};

export type AuditStatsResponse = {
  siteId?: string;
  success?: boolean;
  scope?: string;
  mode?: string;
  beforeDate?: string;
  cutoff?: string;
  totalEntries?: number;
  matchingEntries?: number;
  deleteCount?: number;
};

export type ProcessedCommitsStatsResponse = {
  siteId?: string;
  success?: boolean;
  table?: string;
  scope?: string;
  rowCount?: number;
  siteNumericId?: number;
  lastProcessedCommitId?: string;
  preservesLastProcessedCommit?: boolean;
  description?: string;
};

function databasePluginUrl(siteId: string, query = ''): string {
  return pluginUrl('database-tools', siteId, query);
}

export function fetchDatabaseAccess(siteId: string) {
  return pluginGet<DatabaseAccessResponse>(siteId, databasePluginUrl(siteId, 'action=access'));
}

export function fetchAuditStats(siteId: string, opts: { scope: 'site' | 'global'; beforeDate?: string }) {
  let q = 'action=auditStats&scope=' + encodeURIComponent(opts.scope);
  if (opts.beforeDate) {
    q += '&beforeDate=' + encodeURIComponent(opts.beforeDate);
  }
  return pluginGet<AuditStatsResponse>(siteId, databasePluginUrl(siteId, q));
}

export function postTruncateAudit(
  siteId: string,
  opts: {
    scope: 'site' | 'global';
    mode: 'all' | 'beforeDate';
    beforeDate?: string;
    confirmed: boolean;
  }
) {
  return postJSON(databasePluginUrl(siteId), { siteId, action: 'truncateAudit', ...opts }).pipe(
    map((r) => {
      const data = unwrapPluginResponse<{
        success: boolean;
        deletedCount?: number;
        message?: string;
        siteId?: string;
      }>(r);
      assertSiteScope(siteId, data);
      return data;
    })
  );
}

export function fetchProcessedCommitsStats(siteId: string, opts: { scope: 'site' | 'global' }) {
  const q = 'action=processedCommitsStats&scope=' + encodeURIComponent(opts.scope);
  return pluginGet<ProcessedCommitsStatsResponse>(siteId, databasePluginUrl(siteId, q));
}

export function postTruncateProcessedCommits(
  siteId: string,
  opts: {
    scope: 'site' | 'global';
    confirmed: boolean;
  }
) {
  return postJSON(databasePluginUrl(siteId), { siteId, action: 'truncateProcessedCommits', ...opts }).pipe(
    map((r) => {
      const data = unwrapPluginResponse<{
        success: boolean;
        deletedCount?: number;
        message?: string;
        siteId?: string;
        preservesLastProcessedCommit?: boolean;
      }>(r);
      assertSiteScope(siteId, data);
      return data;
    })
  );
}

export function fetchBlobStoreOverview(siteId: string) {
  return pluginGet<BlobStoreOverview>(siteId, pluginUrl('dev-content-ops-git', siteId, 'action=blobStores')).pipe(
    map((data) =>
      assertSiteScope(siteId, {
        ...data,
        configured: Boolean(data.configured),
        stores: (data.stores ?? []).map((store) => ({
          ...store,
          id: apiText(store.id),
          type: apiText(store.type),
          pattern: apiText(store.pattern),
          treeRoot: apiText(store.treeRoot),
          mappings: (store.mappings ?? []).map((mapping) => ({
            publishingTarget: apiText(mapping.publishingTarget),
            storeTarget: apiText(mapping.storeTarget),
            prefix: mapping.prefix ? apiText(mapping.prefix) : undefined
          }))
        })),
        stagingTarget: apiText(data.stagingTarget),
        liveTarget: apiText(data.liveTarget)
      })
    )
  );
}

export function fetchBlobStoreChildren(siteId: string, storeId: string, path?: string) {
  let q = 'action=blobStoreChildren&storeId=' + encodeURIComponent(storeId);
  if (path) {
    q += '&path=' + encodeURIComponent(path);
  }
  return pluginGet<BlobStoreChildrenResponse>(siteId, pluginUrl('dev-content-ops-git', siteId, q)).pipe(
    map((data) =>
      assertSiteScope(siteId, {
        ...data,
        storeId: apiText(data.storeId) || storeId,
        parentPath: apiText(data.parentPath),
        entries: (data.entries ?? []).map((entry) => ({
          ...entry,
          name: apiText(entry.name),
          path: apiText(entry.path),
          folder: Boolean(entry.folder),
          repoPointerPath: entry.repoPointerPath ? apiText(entry.repoPointerPath) : undefined,
          presence: entry.presence
            ? {
                inRepo: Boolean(entry.presence.inRepo),
                inPreview: Boolean(entry.presence.inPreview),
                inStaging: Boolean(entry.presence.inStaging),
                inLive: Boolean(entry.presence.inLive),
                stagingConfigured: Boolean(entry.presence.stagingConfigured),
                liveConfigured: Boolean(entry.presence.liveConfigured)
              }
            : undefined
        }))
      })
    )
  );
}

export function postSyncBlobStore(
  siteId: string,
  opts: {
    target: 'staging' | 'live';
    paths: string[];
    storeId?: string;
  }
) {
  return postJSON(pluginUrl('dev-content-ops-git', siteId), {
    siteId,
    action: 'syncBlobStore',
    target: opts.target,
    paths: opts.paths,
    storeId: opts.storeId
  }).pipe(
    map((r) => {
      const data = unwrapPluginResponse<BlobStoreSyncResult>(r);
      assertSiteScope(siteId, data);
      return {
        ...data,
        target: apiText(data.target),
        publishingTarget: apiText(data.publishingTarget),
        storeId: apiText(data.storeId),
        message: data.message ? apiText(data.message) : undefined,
        syncedPaths: (data.syncedPaths ?? []).map((p) => apiText(p)),
        failedPaths: (data.failedPaths ?? []).map((p) => apiText(p))
      };
    })
  );
}
