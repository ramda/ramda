export function all<T>(fn: (a: T) => boolean, list: readonly T[]): boolean;
export function all<T>(fn: (a: T) => boolean): (list: readonly T[]) => boolean;