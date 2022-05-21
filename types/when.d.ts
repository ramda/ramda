export function when<T, U extends T, V>(pred: (a: T) => a is U, whenTrueFn: (a: U) => V, a: T): T | V;
export function when<T, U>(pred: (a: T) => boolean, whenTrueFn: (a: T) => U, a: T): T | U;
export function when<T, U extends T, V>(pred: (a: T) => a is U, whenTrueFn: (a: U) => V): (a: T) => T | V;
export function when<T, U>(pred: (a: T) => boolean, whenTrueFn: (a: T) => U): (a: T) => T | U;