export function count<T>(fn: (a: T) => boolean, list: readonly T[]): number;
export function count<T>(fn: (a: T) => boolean): (list: readonly T[]) => number;
