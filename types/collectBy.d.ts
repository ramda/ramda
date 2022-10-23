export function collectBy<T, K extends PropertyKey>(keyFn: (value: T) => K, list: readonly T[]): T[][];
export function collectBy<T, K extends PropertyKey>(keyFn: (value: T) => K): (list: readonly T[]) => T[][];
