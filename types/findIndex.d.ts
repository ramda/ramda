export function findIndex<T>(fn: (a: T) => boolean, list: readonly T[]): number;
export function findIndex<T>(fn: (a: T) => boolean): (list: readonly T[]) => number;