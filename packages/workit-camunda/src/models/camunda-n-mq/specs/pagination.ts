// Copyright (c) Ville de Montreal. All rights reserved.
// Licensed under the MIT license.
// See LICENSE file in the project root for full license information.

import { IPaging } from './paging';
export interface IPagination<T> {
  paging: IPaging;
  items: T[];
}