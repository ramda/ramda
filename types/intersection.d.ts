export function intersection<T>(list1: readonly T[], list2: readonly T[]): T[];
export function intersection<T>(list1: readonly T[]): (list2: readonly T[]) => T[];