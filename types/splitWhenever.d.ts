export function splitWhenever<T>(pred: (a: T) => boolean, list: T[]): T[][];
export function splitWhenever<T>(pred: (a: T) => boolean): <U extends T>(list: U[]) => U[][];
