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

import { get, post } from '@craftercms/studio-ui/utils/ajax';

const MAX_CONCURRENT_GETS = 3;

type GetJob = {
  url: string;
  resolve: (value: any) => void;
  reject: (reason: unknown) => void;
};

const getQueue: GetJob[] = [];
let activeGets = 0;

function pumpGetQueue() {
  while (activeGets < MAX_CONCURRENT_GETS && getQueue.length > 0) {
    const job = getQueue.shift()!;
    activeGets += 1;
    get(job.url).subscribe({
      next: (response) => {
        activeGets -= 1;
        job.resolve(response);
        pumpGetQueue();
      },
      error(e) {
        activeGets -= 1;
        job.reject(e);
        pumpGetQueue();
      }
    });
  }
}

const HttpUtils = {
  get(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      getQueue.push({ url, resolve, reject });
      pumpGetQueue();
    });
  },
  post(url: string, body?: any, headers?: Headers): Promise<any> {
    return new Promise((resolve, reject) => {
      post(url, body, headers).subscribe({
        next: (response) => {
          resolve(response);
        },
        error(e) {
          reject(e);
        }
      });
    });
  }
};

export default HttpUtils;
