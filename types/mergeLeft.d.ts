import { Merge } from './util/tools';

export function mergeLeft<O1 extends object, O2 extends object>(a: O1, b: O2): Merge<O1, O2, 'flat'>;
export function mergeLeft<O1 extends object>(a: O1): <O2 extends object>(b: O2) => Merge<O1, O2, 'flat'>;