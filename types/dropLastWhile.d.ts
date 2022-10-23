export function dropLastWhile<T>(fn: (a: T) => boolean, list: readonly T[]): T[];
export function dropLastWhile<T>(fn: (a: T) => boolean): (list: readonly T[]) => T[];
