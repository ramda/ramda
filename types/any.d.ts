import { Placeholder } from './util/tools';

export function any<T>(__: Placeholder, list: readonly T[]): (fn: (a: T) => boolean) => boolean;
export function any<T>(fn: (a: T) => boolean, list: readonly T[]): boolean;
export function any<T>(fn: (a: T) => boolean): (list: readonly T[]) => boolean;
