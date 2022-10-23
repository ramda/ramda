import { Ord } from './util/tools';

export function sortBy<T>(fn: (a: T) => Ord, list: readonly T[]): T[];
export function sortBy<T>(fn: (a: T) => Ord): (list: readonly T[]) => T[];
export function sortBy(fn: (a: any) => Ord): <T>(list: readonly T[]) => T[];
