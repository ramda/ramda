export function adjust<T>(index: number, fn: (a: T) => T, list: readonly T[]): T[];
export function adjust<T>(index: number, fn: (a: T) => T): (list: readonly T[]) => T[];