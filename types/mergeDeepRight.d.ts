import { Merge } from './util/tools';

export function mergeDeepRight<O1 extends object, O2 extends object>(o1: O1, o2: O2): Merge<O2, O1, 'deep'>;
export function mergeDeepRight<O1 extends object>(a: O1): <O2 extends object>(o2: O2) => Merge<O2, O1, 'deep'>;