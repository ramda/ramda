export function sort<T>(fn: (a: T, b: T) => number, list: readonly T[]): T[];
export function sort<T>(fn: (a: T, b: T) => number): (list: readonly T[]) => T[];