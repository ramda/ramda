export function intersperse<T>(separator: T, list: readonly T[]): T[];
export function intersperse<T>(separator: T): (list: readonly T[]) => T[];
