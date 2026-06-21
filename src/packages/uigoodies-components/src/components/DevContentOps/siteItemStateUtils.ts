/*
 * Copyright (C) 2007-2026 Crafter Software Corporation. All Rights Reserved.
 */

import type { ItemStateMap, ItemStates } from '@craftercms/studio-ui/models/Item';
import {
  PUBLISHING_DESTINATION_MASK,
  PUBLISHING_LIVE_MASK,
  PUBLISHING_STAGED_MASK,
  STATE_DELETED_MASK,
  STATE_DISABLED_MASK,
  STATE_LOCKED_MASK,
  STATE_MODIFIED_MASK,
  STATE_NEW_MASK,
  STATE_PUBLISHING_MASK,
  STATE_SCHEDULED_MASK,
  STATE_SUBMITTED_MASK,
  STATE_SYSTEM_PROCESSING_MASK,
  STATE_TRANSLATION_IN_PROGRESS_MASK,
  STATE_TRANSLATION_PENDING_MASK,
  STATE_TRANSLATION_UP_TO_DATE_MASK
} from '@craftercms/studio-ui/utils/constants';

export type StateFilterKey = Extract<
  ItemStates,
  | 'new'
  | 'modified'
  | 'deleted'
  | 'locked'
  | 'systemProcessing'
  | 'submitted'
  | 'scheduled'
  | 'publishing'
  | 'staged'
  | 'live'
  | 'disabled'
>;

export const STATE_FILTER_BITS: Array<{ key: StateFilterKey; label: string }> = [
  { key: 'new', label: 'New' },
  { key: 'modified', label: 'Modified' },
  { key: 'deleted', label: 'Deleted' },
  { key: 'locked', label: 'Locked' },
  { key: 'systemProcessing', label: 'System processing' },
  { key: 'submitted', label: 'Submitted' },
  { key: 'scheduled', label: 'Scheduled' },
  { key: 'publishing', label: 'Publishing' },
  { key: 'staged', label: 'Staged' },
  { key: 'live', label: 'Live' },
  { key: 'disabled', label: 'Disabled' }
];

export const INDIVIDUAL_STATE_BITS: Array<{ id: string; label: string; mask: number }> = [
  { id: 'new', label: 'New', mask: STATE_NEW_MASK },
  { id: 'modified', label: 'Modified', mask: STATE_MODIFIED_MASK },
  { id: 'deleted', label: 'Deleted', mask: STATE_DELETED_MASK },
  { id: 'locked', label: 'Locked', mask: STATE_LOCKED_MASK },
  { id: 'systemProcessing', label: 'System processing', mask: STATE_SYSTEM_PROCESSING_MASK },
  { id: 'submitted', label: 'Submitted', mask: STATE_SUBMITTED_MASK },
  { id: 'scheduled', label: 'Scheduled', mask: STATE_SCHEDULED_MASK },
  { id: 'publishing', label: 'Publishing', mask: STATE_PUBLISHING_MASK },
  { id: 'destination', label: 'Publish destination', mask: PUBLISHING_DESTINATION_MASK },
  { id: 'staged', label: 'Staged', mask: PUBLISHING_STAGED_MASK },
  { id: 'live', label: 'Live', mask: PUBLISHING_LIVE_MASK },
  { id: 'disabled', label: 'Disabled', mask: STATE_DISABLED_MASK },
  { id: 'translationUpToDate', label: 'Translation up to date', mask: STATE_TRANSLATION_UP_TO_DATE_MASK },
  { id: 'translationPending', label: 'Translation pending', mask: STATE_TRANSLATION_PENDING_MASK },
  { id: 'translationInProgress', label: 'Translation in progress', mask: STATE_TRANSLATION_IN_PROGRESS_MASK }
];

export function formatStateBitLabel(label: string, mask: number): string {
  return `${label} (${mask})`;
}

/** Table/list display — human label only; mask shown in detail panel or tooltip. */
export function formatStateBitShortLabel(label: string): string {
  return label;
}

export function shortContentTypeLabel(item: { contentTypeId?: string; systemType?: string }): string {
  const raw = item.contentTypeId || item.systemType || '—';
  if (raw.includes('/')) {
    return raw.split('/').filter(Boolean).pop() ?? raw;
  }
  return raw;
}

export function displayItemPath(path: string): string {
  return path.replace(/^\.\//, '');
}

export function isStateBitSet(state: number, mask: number): boolean {
  return Boolean(state & mask);
}

export function activeStateBitEntries(state: number): Array<{ id: string; label: string; mask: number }> {
  return INDIVIDUAL_STATE_BITS.filter((bit) => isStateBitSet(state, bit.mask));
}

export type ItemStateToggleControl = {
  id: string;
  label: string;
  mask: number;
};

/** Per-item toggles for every primitive state bit in Crafter's item state integer. */
export const ITEM_STATE_TOGGLE_CONTROLS: ItemStateToggleControl[] = INDIVIDUAL_STATE_BITS.map((bit) => ({
  id: bit.id,
  label: bit.label,
  mask: bit.mask
}));

export function getStateBitmap(stateMap: Partial<ItemStateMap>): number {
  let mask = 0;
  if (stateMap.new) mask += STATE_NEW_MASK;
  if (stateMap.modified) mask += STATE_MODIFIED_MASK;
  if (stateMap.deleted) mask += STATE_DELETED_MASK;
  if (stateMap.locked) mask += STATE_LOCKED_MASK;
  if (stateMap.systemProcessing) mask += STATE_SYSTEM_PROCESSING_MASK;
  if (stateMap.submitted) mask += STATE_SUBMITTED_MASK;
  if (stateMap.scheduled) mask += STATE_SCHEDULED_MASK;
  if (stateMap.publishing) mask += STATE_PUBLISHING_MASK;
  if (stateMap.staged) mask += PUBLISHING_STAGED_MASK;
  if (stateMap.live) mask += PUBLISHING_LIVE_MASK;
  if (stateMap.disabled) mask += STATE_DISABLED_MASK;
  if (stateMap.translationUpToDate) mask += STATE_TRANSLATION_UP_TO_DATE_MASK;
  if (stateMap.translationPending) mask += STATE_TRANSLATION_PENDING_MASK;
  if (stateMap.translationInProgress) mask += STATE_TRANSLATION_IN_PROGRESS_MASK;
  return mask;
}

export function buildItemStateBitMasks(
  currentState: number,
  draft: Record<string, boolean>
): { onMask: number; offMask: number } {
  let onMask = 0;
  let offMask = 0;
  for (const control of ITEM_STATE_TOGGLE_CONTROLS) {
    const shouldBeOn = Boolean(draft[control.id]);
    const isOn = isStateBitSet(currentState, control.mask);
    if (shouldBeOn && !isOn) {
      onMask |= control.mask;
    } else if (!shouldBeOn && isOn) {
      offMask |= control.mask;
    }
  }
  return { onMask, offMask };
}

export function itemStateDraftFromState(state: number): Record<string, boolean> {
  const draft: Record<string, boolean> = {};
  for (const control of ITEM_STATE_TOGGLE_CONTROLS) {
    draft[control.id] = isStateBitSet(state, control.mask);
  }
  return draft;
}

export function itemStateDraftHasChanges(currentState: number, draft: Record<string, boolean>): boolean {
  const { onMask, offMask } = buildItemStateBitMasks(currentState, draft);
  return onMask !== 0 || offMask !== 0;
}

/** Combined integer value for the current toggle draft. */
export function stateIntegerFromDraft(draft: Record<string, boolean>): number {
  let value = 0;
  for (const control of ITEM_STATE_TOGGLE_CONTROLS) {
    if (draft[control.id]) {
      value |= control.mask;
    }
  }
  return value;
}

export const DEFAULT_ITEM_PATH_REGEX = '.*';

export function resolveItemPathRegex(pathRegex: string): string {
  const trimmed = pathRegex.trim();
  return trimmed || DEFAULT_ITEM_PATH_REGEX;
}

export function itemMatchesName(item: { label?: string }, nameFilter: string): boolean {
  if (!nameFilter.trim()) {
    return true;
  }
  return (item.label ?? '').toLowerCase().includes(nameFilter.trim().toLowerCase());
}

export function itemMatchesType(
  item: { contentTypeId?: string; systemType?: string },
  typeFilter: string
): boolean {
  if (!typeFilter.trim()) {
    return true;
  }
  const needle = typeFilter.trim().toLowerCase();
  return (
    (item.contentTypeId ?? '').toLowerCase().includes(needle) ||
    (item.systemType ?? '').toLowerCase().includes(needle)
  );
}

export function activeStateKeys(stateMap: ItemStateMap): StateFilterKey[] {
  return STATE_FILTER_BITS.filter(({ key }) => Boolean(stateMap[key])).map(({ key }) => key);
}
