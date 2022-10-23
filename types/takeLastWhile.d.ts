export function takeLastWhile<T>(pred: (a: T) => boolean, list: readonly T[]): T[];
export function takeLastWhile<T>(pred: (a: T) => boolean): <T>(list: readonly T[]) => T[];
