import { InferAllAType, Placeholder } from './util/tools';

// all(fn, list)
export function all<T>(fn: (a: T) => boolean, list: readonly T[]): boolean;
// all(fn, { all })
export function all<T, U extends { all: (fn: (a: T) => boolean) => boolean }>(fn: (a: T) => boolean, obj: U): boolean;

// all(__, list)(fn)
export function all<T>(__: Placeholder, list: readonly T[]): (fn: (a: T) => boolean) => boolean;
// all(__, { all })(fn)
export function all<U extends { all: (fn: (a: any) => boolean) => boolean }>(__: Placeholder, obj: U): (fn: (a: InferAllAType<U>) => boolean) => boolean;

// all (fn)
export function all<T>(fn: (a: T) => boolean): {
  // all (fn)(list)
  (list: readonly T[]): boolean;
  // all (fn)({ all })
  <U extends { all: (fn: (a: T) => boolean) => boolean }>(obj: U): boolean;
};
