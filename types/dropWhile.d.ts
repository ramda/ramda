export function dropWhile<T>(fn: (a: T) => boolean, list: readonly T[]): T[];
export function dropWhile<T>(fn: (a: T) => boolean): (list: readonly T[]) => T[];
