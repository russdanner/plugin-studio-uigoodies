import * as React from 'react';
import { useStore } from 'react-redux';
import usePreviewGuest from '@craftercms/studio-ui/hooks/usePreviewGuest';
import {
  reloadRequest,
  updateFieldValueOperationComplete,
  insertOperationComplete,
  insertItemOperationComplete,
  duplicateItemOperationComplete,
  moveItemOperationComplete,
  sortItemOperationComplete,
  deleteItemOperationComplete
} from '@craftercms/studio-ui/state/actions/preview';
import { getGuestToHostBus, getHostToGuestBus, getHostToHostBus } from '@craftercms/studio-ui/utils/subjects';

/** Guest iframe → Studio messages use `type` or legacy `topic` (see Host.js postMessage normalizer). */
function previewIntercomType(action: unknown): string | undefined {
  if (!action || typeof action !== 'object') {
    return undefined;
  }
  const a = action as { type?: string; topic?: string };
  return a.type ?? a.topic;
}

const GUEST_WRITE_ACTION_TYPES = new Set([
  'UPDATE_FIELD_VALUE_OPERATION',
  'INSERT_COMPONENT_OPERATION',
  'INSERT_ITEM_OPERATION',
  'DUPLICATE_ITEM_OPERATION',
  'MOVE_ITEM_OPERATION',
  'DELETE_ITEM_OPERATION',
  'SORT_ITEM_OPERATION'
]);

type StudioStateSlice = {
  content?: {
    itemsByPath?: Record<string, unknown>;
    itemsBeingFetchedByPath?: Record<string, boolean | undefined>;
  };
  preview?: {
    guest?: { path?: string; modelId?: string | null; models?: Record<string, unknown> | null };
  };
};

/**
 * Debounced re-run when preview navigates, content reloads, or XB/ICE buses fire.
 * Shared by link-check and accessibility toolbar widgets.
 */
export function usePreviewToolbarAutoRecheck(
  runCheckRef: React.MutableRefObject<() => void | Promise<void>>,
  guest: ReturnType<typeof usePreviewGuest>
): void {
  const store = useStore();

  React.useEffect(() => {
    if (!guest?.url) {
      return;
    }
    const t = window.setTimeout(() => {
      void runCheckRef.current();
    }, 700);
    return () => window.clearTimeout(t);
  }, [guest?.url, guest?.path, guest?.models]);

  React.useEffect(() => {
    const guestPath = guest?.path;
    if (!guest?.url || !guestPath) {
      return;
    }

    let debounceTimer: number | undefined;
    const schedule = () => {
      window.clearTimeout(debounceTimer);
      debounceTimer = window.setTimeout(() => void runCheckRef.current(), 900);
    };

    const read = () => {
      const s = store.getState() as StudioStateSlice;
      const g = s.preview?.guest;
      const modelId = g?.modelId;
      const model =
        modelId && g?.models && Object.prototype.hasOwnProperty.call(g.models, modelId)
          ? g.models[modelId]
          : undefined;
      return {
        item: s.content?.itemsByPath?.[guestPath],
        fetching: s.content?.itemsBeingFetchedByPath?.[guestPath],
        model
      };
    };

    let prev = read();

    const unsubscribe = store.subscribe(() => {
      const s = store.getState() as StudioStateSlice;
      if (s.preview?.guest?.path !== guestPath) {
        return;
      }
      const next = read();
      if (next.item !== prev.item || next.fetching !== prev.fetching || next.model !== prev.model) {
        prev = next;
        schedule();
      }
    });

    return () => {
      unsubscribe();
      window.clearTimeout(debounceTimer);
    };
  }, [guest?.url, guest?.path, store]);

  React.useEffect(() => {
    let debounceTimer: number | undefined;

    const schedule = () => {
      window.clearTimeout(debounceTimer);
      debounceTimer = window.setTimeout(() => void runCheckRef.current(), 900);
    };

    const previewContentChangedMatchers = [
      reloadRequest,
      updateFieldValueOperationComplete,
      insertOperationComplete,
      insertItemOperationComplete,
      duplicateItemOperationComplete,
      moveItemOperationComplete,
      sortItemOperationComplete,
      deleteItemOperationComplete
    ] as const;

    const onHostIntercom = (action: unknown) => {
      if (previewContentChangedMatchers.some((m) => m.match(action as never))) {
        schedule();
      }
    };

    const onGuestToHost = (action: unknown) => {
      const t = previewIntercomType(action);
      if (t && GUEST_WRITE_ACTION_TYPES.has(t)) {
        schedule();
      }
    };

    const h2g = getHostToGuestBus();
    const h2h = getHostToHostBus();
    const g2h = getGuestToHostBus();
    const s1 = h2g.subscribe(onHostIntercom);
    const s2 = h2h.subscribe(onHostIntercom);
    const s3 = g2h.subscribe(onGuestToHost);
    return () => {
      s1.unsubscribe();
      s2.unsubscribe();
      s3.unsubscribe();
      window.clearTimeout(debounceTimer);
    };
  }, []);
}
