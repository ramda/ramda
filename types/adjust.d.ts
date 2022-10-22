import { Placeholder } from './util/tools';

export function adjust<T>(index: number, fn: (a: T) => T, list: readonly T[]): T[];
export function adjust<T>(index: number, fn: (a: T) => T): (list: readonly T[]) => T[];
export function adjust(index: number): {
  <T>(fn: (a: T) => T, list: readonly T[]): T[];
  <T>(fn: (a: T) => T): (list: readonly T[]) => T[];
}

export function adjust<T>(__: Placeholder, fn: (a: T) => T, list: readonly T[]): (index: number) => T[];
export function adjust<T>(index: number, __: Placeholder, list: readonly T[]): (fn: (a: T) => T) => T[];
export function adjust<T>(__: Placeholder, __2: Placeholder, list: readonly T[]): {
  (index: number, fn: (a: T) => T): T[];
  (index: number): (fn: (a: T) => T) => T[];
}
