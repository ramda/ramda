export function until<T, U>(pred: (val: T) => boolean, fn: (val: T) => U, init: U): U;
export function until<T, U>(pred: (val: T) => boolean, fn: (val: T) => U): (init: U) => U;