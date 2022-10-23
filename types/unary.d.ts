export function unary<T, R>(fn: (a: T, ...args: readonly any[]) => R): (a: T) => R;
