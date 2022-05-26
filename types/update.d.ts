export function update<T>(index: number, value: T, list: readonly T[]): T[];
export function update<T>(index: number, value: T): (list: readonly T[]) => T[];