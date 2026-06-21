/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 */

export type AuditTruncateScope = 'site' | 'global';
export type AuditTruncateMode = 'all' | 'beforeDate';

export type AuditTruncateOption = {
  id: string;
  scope: AuditTruncateScope;
  mode: AuditTruncateMode;
  label: string;
  summary: string;
  consequence: string;
  whatIsDestroyed: string;
  whatIsPreserved: string;
};

export const AUDIT_TRUNCATE_OPTIONS: AuditTruncateOption[] = [
  {
    id: 'site-all',
    scope: 'site',
    mode: 'all',
    label: 'Delete all audit history for this project',
    summary: 'Permanently removes every audit log entry for the selected project.',
    consequence: 'Project audit history will be empty. Studio activity for this project will no longer appear in Audit.',
    whatIsDestroyed:
      'All rows in the Studio audit tables for this project, including content, publish, login, and configuration events tied to the project.',
    whatIsPreserved:
      'Site content, git history, users, groups, and audit history for other projects.'
  },
  {
    id: 'site-before-date',
    scope: 'site',
    mode: 'beforeDate',
    label: 'Delete project audit history before a date',
    summary: 'Permanently removes audit entries older than the selected date for this project.',
    consequence: 'Audit entries with timestamps before the cutoff date are deleted for this project only.',
    whatIsDestroyed:
      'Audit log rows (and their parameters) for this project with operation timestamps before the selected date.',
    whatIsPreserved:
      'Audit entries on or after the selected date for this project, plus all other projects and site content.'
  },
  {
    id: 'global-all',
    scope: 'global',
    mode: 'all',
    label: 'Delete all audit history (entire Studio)',
    summary: 'Permanently removes every audit log entry for all projects and system activity.',
    consequence: 'The Studio audit log will be empty across all projects.',
    whatIsDestroyed:
      'All rows in the audit and audit_parameters tables for every project and system-level Studio activity.',
    whatIsPreserved: 'Site content, git repositories, users, and groups. Only audit history is removed.'
  },
  {
    id: 'global-before-date',
    scope: 'global',
    mode: 'beforeDate',
    label: 'Delete all audit history before a date (entire Studio)',
    summary: 'Permanently removes audit entries older than the selected date across Studio.',
    consequence: 'Audit entries with timestamps before the cutoff date are deleted for all projects.',
    whatIsDestroyed:
      'Audit log rows (and their parameters) with operation timestamps before the selected date across Studio.',
    whatIsPreserved: 'Audit entries on or after the selected date, site content, git history, users, and groups.'
  }
];

export function getAuditTruncateOption(scope: AuditTruncateScope, mode: AuditTruncateMode): AuditTruncateOption {
  return (
    AUDIT_TRUNCATE_OPTIONS.find((option) => option.scope === scope && option.mode === mode) ??
    AUDIT_TRUNCATE_OPTIONS[0]
  );
}

export type ProcessedCommitsTruncateScope = 'site' | 'global';

export type ProcessedCommitsTruncateOption = {
  scope: ProcessedCommitsTruncateScope;
  label: string;
  summary: string;
  consequence: string;
  whatIsDestroyed: string;
  whatIsPreserved: string;
};

export const PROCESSED_COMMITS_TRUNCATE_OPTIONS: ProcessedCommitsTruncateOption[] = [
  {
    scope: 'site',
    label: 'Clear processed commits cache for this project',
    summary:
      'Removes rows from the processed_commits table for this project. Studio uses this table as a short-lived sync helper while ingesting git commits.',
    consequence:
      'Git Log per-commit "processed" badges may be wrong until the next sync. Sync continues from site.last_commit_id.',
    whatIsDestroyed:
      'Rows in processed_commits for this project only. These are bookkeeping entries, not git commits or site content.',
    whatIsPreserved:
      'Git history, site content, site.last_commit_id (the canonical sync pointer), and processed_commits rows for other projects.'
  },
  {
    scope: 'global',
    label: 'Clear processed commits cache (entire Studio)',
    summary: 'Removes all rows from processed_commits across every project.',
    consequence:
      'All projects may show incorrect per-commit processed badges until their next sync. No content or git history is deleted.',
    whatIsDestroyed: 'All rows in the processed_commits table for every project.',
    whatIsPreserved:
      'Git repositories, site content, site.last_commit_id values on each project, and all other Studio tables.'
  }
];

export function getProcessedCommitsTruncateOption(scope: ProcessedCommitsTruncateScope): ProcessedCommitsTruncateOption {
  return PROCESSED_COMMITS_TRUNCATE_OPTIONS.find((option) => option.scope === scope) ?? PROCESSED_COMMITS_TRUNCATE_OPTIONS[0];
}
