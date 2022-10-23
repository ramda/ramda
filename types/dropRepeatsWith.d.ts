export function dropRepeatsWith<T>(predicate: (left: T, right: T) => boolean, list: readonly T[]): T[];
export function dropRepeatsWith<T>(predicate: (left: T, right: T) => boolean): (list: readonly T[]) => T[];
