export function defaultTo<T, U>(a: T, b: U | null | undefined): T | U;
export function defaultTo<T>(a: T): <U>(b: U | null | undefined) => T | U;
