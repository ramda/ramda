import { Merge } from './util/tools';

export function mergeRight<O1 extends object, O2 extends object>(a: O1, b: O2): Merge<O2, O1, 'flat'>;
export function mergeRight<O1 extends object>(a: O1): <O2 extends object>(b: O2) => Merge<O2, O1, 'flat'>;