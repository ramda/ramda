export function reduceRight<T, TResult>(
  fn: (elem: T, acc: TResult) => TResult,
  acc: TResult,
  list: readonly T[],
): TResult;
export function reduceRight<T, TResult>(
  fn: (elem: T, acc: TResult) => TResult,
): (acc: TResult, list: readonly T[]) => TResult;
export function reduceRight<T, TResult>(
  fn: (elem: T, acc: TResult) => TResult,
  acc: TResult,
): (list: readonly T[]) => TResult;
