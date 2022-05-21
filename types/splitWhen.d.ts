export function splitWhen<T>(pred: (val: T) => boolean, list: readonly T[]): [T[], T[]];
export function splitWhen<T>(pred: (val: T) => boolean): <U extends T>(list: readonly U[]) => [U[], U[]];