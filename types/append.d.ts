export function append<T>(el: T, list: readonly T[]): T[];
export function append<T>(el: T): (list: readonly T[]) => T[];
