import { InferAllAType, Placeholder } from './util/tools';

export function all<T>(fn: (a: T) => boolean, list: readonly T[]): boolean;
export function all<T, U extends { all: (fn: (a: T) => boolean) => boolean }>(fn: (a: T) => boolean, obj: U): boolean;

export function all<T>(__: Placeholder, list: readonly T[]): (fn: (a: T) => boolean) => boolean;
export function all<U extends { all: (fn: (a: any) => boolean) => boolean }>(__: Placeholder, obj: U): (fn: (a: InferAllAType<U>) => boolean) => boolean;

export function all<T>(fn: (a: T) => boolean): {
  (list: readonly T[]): boolean;
  <U extends { all: (fn: (a: T) => boolean) => boolean }>(obj: U): boolean;
};
