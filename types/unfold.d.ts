export function unfold<T, TResult>(fn: (seed: T) => [TResult, T] | false, seed: T): TResult[];
export function unfold<T, TResult>(fn: (seed: T) => [TResult, T] | false): (seed: T) => TResult[];