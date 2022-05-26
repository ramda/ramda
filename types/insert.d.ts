export function insert<T>(index: number, elt: T, list: readonly T[]): T[];
export function insert<T>(index: number, elt: T): (list: readonly T[]) => T[];
export function insert(index: number): <T>(elt: T, list: readonly T[]) => T[];