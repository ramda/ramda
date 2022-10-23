export function without<T>(list1: readonly T[], list2: readonly T[]): T[];
export function without<T>(list1: readonly T[]): (list2: readonly T[]) => T[];
