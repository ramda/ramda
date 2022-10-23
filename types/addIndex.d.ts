import * as _ from 'ts-toolbelt';

/* Special case for forEach */
export function addIndex<T>(
  fn: (f: (item: T) => void, list: readonly T[]) => T[],
): _.F.Curry<(a: (item: T, idx: number, list: T[]) => void, b: readonly T[]) => T[]>;
/* Special case for filter */
export function addIndex<T>(
  fn: (f: (item: T) => boolean, list: readonly T[]) => T[],
): _.F.Curry<(a: (item: T, idx: number, list: T[]) => boolean, b: readonly T[]) => T[]>;
/* Special case for map */
export function addIndex<T, U>(
  fn: (f: (item: T) => U, list: readonly T[]) => U[],
): _.F.Curry<(a: (item: T, idx: number, list: T[]) => U, b: readonly T[]) => U[]>;
/* Special case for reduce */
export function addIndex<T, U>(
  fn: (f: (acc: U, item: T) => U, aci: U, list: readonly T[]) => U,
): _.F.Curry<(a: (acc: U, item: T, idx: number, list: T[]) => U, b: U, c: readonly T[]) => U>;
