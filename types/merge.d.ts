import { Placeholder, Merge } from './util/tools';

export function merge<O2 extends object>(__: Placeholder, b: O2): <O1 extends object>(a: O1) => Merge<O2, O1, 'flat'>;
export function merge(__: Placeholder): <O1 extends object, O2 extends object>(b: O2, a: O1) => Merge<O2, O1, 'flat'>;
export function merge<O1 extends object, O2 extends object>(a: O1, b: O2): Merge<O2, O1, 'flat'>;
export function merge<O1 extends object>(a: O1): <O2 extends object>(b: O2) => Merge<O2, O1, 'flat'>;