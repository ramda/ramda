export function insertAll<T>(index: number, elts: readonly T[], list: readonly T[]): T[];
export function insertAll<T>(index: number, elts: readonly T[]): (list: readonly T[]) => T[];
export function insertAll(index: number): <T>(elts: readonly T[], list: readonly T[]) => T[];