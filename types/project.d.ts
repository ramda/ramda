export function project<T, U>(props: readonly string[], objs: readonly T[]): U[];
export function project<T, U>(props: readonly string[]): (objs: readonly T[]) => U[];