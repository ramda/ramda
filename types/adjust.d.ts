import { Placeholder } from './util/tools';

// adjust(index, fn, list)
export function adjust<T>(index: number, fn: (a: T) => T, list: readonly T[]): T[];
// adjust(index, fn)(list)
export function adjust<T>(index: number, fn: (a: T) => T): (list: readonly T[]) => T[];
// adjust(index)
export function adjust(index: number): {
  // adjust(index)(fn, list)
  <T>(fn: (a: T) => T, list: readonly T[]): T[];
  // adjust(index)(__, list)(fn)
  <T>(__: Placeholder, list: readonly T[]): (fn: (a: T) => T) => T[];
  // adjust(index)(fn)(list)
  <T>(fn: (a: T) => T): (list: readonly T[]) => T[];
}

// adjust(__, fn, list)(index)
export function adjust<T>(__: Placeholder, fn: (a: T) => T, list: readonly T[]): (index: number) => T[];
// adjust(index, __, list)(fn)
export function adjust<T>(index: number, __: Placeholder, list: readonly T[]): (fn: (a: T) => T) => T[];
// adjust(__, __, list)
export function adjust<T>(__: Placeholder, __2: Placeholder, list: readonly T[]): {
  // adjust(__, __, list)(index, fn)
  (index: number, fn: (a: T) => T): T[];
  // adjust(__, __, list)(__, fn)(index)
  (__3: Placeholder, fn: (a: T) => T): (index: number) => T[];
  // adjust(__, __, list)(index)(fn)
  (index: number): (fn: (a: T) => T) => T[];
}
