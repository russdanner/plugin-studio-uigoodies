/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 */

import { fetchMyActivity, fetchUnpublished } from '@craftercms/studio-ui/services/dashboard';
import type { Activity } from '@craftercms/studio-ui/models/Activity';
import type { SandboxItem } from '@craftercms/studio-ui/models/Item';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const FEED_LIMIT = 50;

const RECENT_ACTIVITY_ACTIONS = ['CREATE', 'UPDATE', 'MOVE'] as const;

export type ImageStudioContentPickerTab = 'browse' | 'recent' | 'unpublished' | 'search';

export type ContentPickerFeedEntry = {
  path: string;
  label?: string | null;
  systemType?: string;
  subtitle?: string;
};

export type ContentPickerSelection = {
  path: string;
  label: string;
};

function formatDateTime(value: string): string {
  try {
    return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value));
  } catch {
    return value;
  }
}

function activityActionLabel(actionType: Activity['actionType']): string {
  switch (actionType) {
    case 'CREATE':
      return 'Created';
    case 'UPDATE':
      return 'Updated';
    case 'MOVE':
      return 'Moved';
    default:
      return actionType.replace(/_/g, ' ').toLowerCase();
  }
}

function isValidContentPath(path: string | undefined | null): boolean {
  if (!path || !path.trim()) {
    return false;
  }
  const trimmed = path.trim();
  return trimmed !== 'undefined' && trimmed !== 'null';
}

export function isSelectableContentPath(path: string | undefined | null): boolean {
  if (!isValidContentPath(path)) {
    return false;
  }
  const trimmed = path!.trim();
  if (trimmed.includes('level.xml')) {
    return false;
  }
  return trimmed.startsWith('/site/website/') || trimmed.startsWith('/site/components/');
}

function dedupeRecentActivity(activities: Activity[]): ContentPickerFeedEntry[] {
  const seen = new Set<string>();
  const entries: ContentPickerFeedEntry[] = [];

  activities.forEach((activity) => {
    const path = activity.item?.path?.trim();
    if (!path || !isSelectableContentPath(path) || seen.has(path)) {
      return;
    }
    seen.add(path);
    const action = activityActionLabel(activity.actionType);
    const when = activity.actionTimestamp ? formatDateTime(activity.actionTimestamp) : '';
    entries.push({
      path,
      label: activity.item?.label,
      systemType: activity.item?.systemType,
      subtitle: when ? `${action} · ${when}` : action
    });
  });

  return entries;
}

export function loadMyRecentActivityFeed(siteId: string): Observable<ContentPickerFeedEntry[]> {
  return fetchMyActivity(siteId, {
    limit: FEED_LIMIT,
    offset: 0,
    actions: [...RECENT_ACTIVITY_ACTIONS]
  }).pipe(
    map((activities) => dedupeRecentActivity(activities as Activity[])),
    catchError(() => of([]))
  );
}

export function loadUnpublishedWorkFeed(siteId: string): Observable<ContentPickerFeedEntry[]> {
  return fetchUnpublished(siteId, {
    limit: FEED_LIMIT,
    offset: 0,
    sortBy: 'dateModified',
    sortOrder: 'desc'
  }).pipe(
    map((items) =>
      (items as SandboxItem[])
        .filter((item) => isSelectableContentPath(item.path))
        .map((item) => ({
          path: item.path.trim(),
          label: item.label,
          systemType: item.systemType,
          subtitle: item.dateModified ? `Modified · ${formatDateTime(item.dateModified)}` : 'Unpublished'
        }))
    ),
    catchError(() => of([]))
  );
}
