export function uniqBy<T, U>(fn: (a: T) => U, list: readonly T[]): T[];
export function uniqBy<T, U>(fn: (a: T) => U): (list: readonly T[]) => T[];
