export function indexOf(target: string, list: readonly string[] | string): number;
export function indexOf(target: string): (list: readonly string[] | string) => number;
export function indexOf<T>(target: T, list: readonly T[]): number;
export function indexOf<T>(target: T): (list: readonly T[]) => number;
