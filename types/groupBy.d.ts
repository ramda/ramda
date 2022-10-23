export function groupBy<T, K extends string = string>(fn: (a: T) => K, list: readonly T[]): Record<K, T[]>;
export function groupBy<T, K extends string = string>(fn: (a: T) => K): (list: readonly T[]) => Record<K, T[]>;
