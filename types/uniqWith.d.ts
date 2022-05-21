export function uniqWith<T, U>(pred: (x: T, y: T) => boolean, list: readonly T[]): T[];
export function uniqWith<T, U>(pred: (x: T, y: T) => boolean): (list: readonly T[]) => T[];