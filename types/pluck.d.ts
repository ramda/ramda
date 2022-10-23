export function pluck<K extends keyof T, T>(p: K, list: readonly T[]): Array<T[K]>;
export function pluck<T>(p: number, list: Array<{ [k: number]: T }>): T[];
export function pluck<P extends string>(p: P): <T>(list: Array<Record<P, T>>) => T[];
export function pluck(p: number): <T>(list: Array<{ [k: number]: T }>) => T[];
