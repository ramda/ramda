export function scan<T, TResult>(fn: (acc: TResult, elem: T) => any, acc: TResult, list: readonly T[]): TResult[];
export function scan<T, TResult>(fn: (acc: TResult, elem: T) => any, acc: TResult): (list: readonly T[]) => TResult[];
export function scan<T, TResult>(fn: (acc: TResult, elem: T) => any): (acc: TResult, list: readonly T[]) => TResult[];