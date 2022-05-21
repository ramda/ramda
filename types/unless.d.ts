export function unless<T, U>(pred: (a: T) => boolean, whenFalseFn: (a: T) => U, a: T): T | U;
export function unless<T, U>(pred: (a: T) => boolean, whenFalseFn: (a: T) => U): (a: T) => T | U;