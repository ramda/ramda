export function lastIndexOf(target: string, list: readonly string[] | string): number;
export function lastIndexOf(target: string): (list: readonly string[] | string) => number;
export function lastIndexOf<T>(target: T, list: readonly T[]): number;
export function lastIndexOf<T>(target: T): (list: readonly T[]) => number;