export function and<T, U>(a: T, b: U): T | U;
export function and<T>(a: T): <U>(b: U) => T | U;