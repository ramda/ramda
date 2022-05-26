export function sortWith<T>(fns: Array<(a: T, b: T) => number>, list: readonly T[]): T[];
export function sortWith<T>(fns: Array<(a: T, b: T) => number>): (list: readonly T[]) => T[];