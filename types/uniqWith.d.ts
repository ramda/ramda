export function uniqWith<T>(pred: (x: T, y: T) => boolean, list: readonly T[]): T[];
export function uniqWith<T>(pred: (x: T, y: T) => boolean): (list: readonly T[]) => T[];
