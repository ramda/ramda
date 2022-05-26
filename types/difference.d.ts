export function difference<T>(list1: readonly T[], list2: readonly T[]): T[];
export function difference<T>(list1: readonly T[]): (list2: readonly T[]) => T[];