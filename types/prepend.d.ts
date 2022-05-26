export function prepend<T>(el: T, list: readonly T[]): T[];
export function prepend<T>(el: T): (list: readonly T[]) => T[];