export function indexBy<T, K extends string | number = string>(fn: (a: T) => K, list: readonly T[]): { [key in K]: T };
export function indexBy<T, K extends string | number | undefined = string>(
    fn: (a: T) => K,
    list: readonly T[],
): { [key in NonNullable<K>]?: T };
export function indexBy<T, K extends string | number = string>(
    fn: (a: T) => K,
): (list: readonly T[]) => { [key in K]: T };
export function indexBy<T, K extends string | number | undefined = string>(
    fn: (a: T) => K | undefined,
): (list: readonly T[]) => { [key in NonNullable<K>]?: T };