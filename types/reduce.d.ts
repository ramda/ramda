import { Reduced } from './util/tools';

export function reduce<T, TResult>(
  fn: (acc: TResult, elem: T) => TResult | Reduced<TResult>,
  acc: TResult,
  list: readonly T[],
): TResult;
export function reduce<T, TResult>(
  fn: (acc: TResult, elem: T) => TResult | Reduced<TResult>,
): (acc: TResult, list: readonly T[]) => TResult;
export function reduce<T, TResult>(
  fn: (acc: TResult, elem: T) => TResult | Reduced<TResult>,
  acc: TResult,
): (list: readonly T[]) => TResult;
