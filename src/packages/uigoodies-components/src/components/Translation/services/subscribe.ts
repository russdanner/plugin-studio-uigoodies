/*
 * Copyright (C) 2007-2022 Crafter Software Corporation. All Rights Reserved.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as published by
 * the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

import { Subject } from 'rxjs';

const destinationPathSubscriber = new Subject<string>();

/**
 * Publishes the Translation destination path. When `localStorage.translationDebug === '1'`, logs each emit (helps spot storms).
 */
export function emitDestinationPath(path: string, reason?: string): void {
  try {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('translationDebug') === '1') {
      // eslint-disable-next-line no-console
      console.log('[Translation] destinationPath', reason ?? '(no reason)', path);
    }
  } catch {
    /* ignore storage */
  }
  destinationPathSubscriber.next(path);
}

export { destinationPathSubscriber };
