export function dropRepeatsBy<T>(fn: (a: T) => T, list: readonly T[]): T[];
export function dropRepeatsBy<T>(fn: (a: T) => T): (list: readonly T[]) => T[];
export function dropRepeatsBy(fn: any): <T>(list: readonly T[]) => T[];
