export function findLastIndex<T>(fn: (a: T) => boolean, list: readonly T[]): number;
export function findLastIndex<T>(fn: (a: T) => boolean): (list: readonly T[]) => number;
