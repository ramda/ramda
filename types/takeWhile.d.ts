export function takeWhile<T>(fn: (x: T) => boolean, list: readonly T[]): T[];
export function takeWhile<T>(fn: (x: T) => boolean): (list: readonly T[]) => T[];