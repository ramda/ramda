export function into<T>(acc: any, xf: (...a: readonly any[]) => any, list: readonly T[]): T[];
export function into<T, R>(acc: any, xf: (...a: readonly any[]) => R[], list: readonly T[]): R[];
export function into(acc: any, xf: (...a: readonly any[]) => any): <T>(list: readonly T[]) => T[];
export function into(acc: any): <T>(xf: (...a: readonly any[]) => any, list: readonly T[]) => T[];