export function none<T>(fn: (a: T) => boolean, list: readonly T[]): boolean;
export function none<T>(fn: (a: T) => boolean): (list: readonly T[]) => boolean;
