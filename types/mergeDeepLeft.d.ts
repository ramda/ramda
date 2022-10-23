import { Merge } from './util/tools';

export function mergeDeepLeft<O1 extends object, O2 extends object>(o1: O1, o2: O2): Merge<O1, O2, 'deep'>;
export function mergeDeepLeft<O1 extends object>(o1: O1): <O2 extends object>(o2: O2) => Merge<O1, O2, 'deep'>;
