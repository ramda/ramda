import { Placeholder, InferAnyAType } from './util/tools';

// any(fn, list)
export function any<T>(fn: (a: T) => boolean, list: readonly T[]): boolean;
// any(fn, { any })
export function any<T, U extends { any: (fn: (a: T) => boolean) => boolean }>(fn: (a: T) => boolean, obj: U): boolean;

// any(__, list)(fn)
export function any<T>(__: Placeholder, list: readonly T[]): (fn: (a: T) => boolean) => boolean;
// any(__, { any })(fn)
export function any<U extends { any: (fn: (a: any) => boolean) => boolean }>(___: Placeholder, obj: U): (fn: (a: InferAnyAType<U>) => boolean) => boolean

// all(fn)
export function any<T>(fn: (a: T) => boolean): {
  // any(fn)(list)
  (list: readonly T[]): boolean;
  // all (fn)({ any })
  <U extends { any: (fn: (a: T) => boolean) => boolean }>(obj: U): boolean;
};

// TODO: transducer types
