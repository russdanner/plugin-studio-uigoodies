import { showEditDialog } from '@craftercms/studio-ui/state/actions/dialogs';
import type { Dispatch } from 'redux';

/** Opens Studio form editor for `path` (same action as other Translation widgets). */
export function openEditFormStudioDispatch(
  dispatch: Dispatch,
  siteId: string,
  path: string,
  authoringBase: string
): void {
  dispatch(
    showEditDialog({
      site: siteId,
      path,
      authoringBase
    })
  );
}
