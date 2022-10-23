import { PredTypeguard, Pred } from './util/tools';

export function ifElse<T, TF extends T, TOnTrueResult, TOnFalseResult>(
  pred: PredTypeguard<T, TF>,
  onTrue: (a: TF) => TOnTrueResult,
  onFalse: (a: Exclude<T, TF>) => TOnFalseResult,
): (a: T) => TOnTrueResult | TOnFalseResult;
export function ifElse<TArgs extends any[], TOnTrueResult, TOnFalseResult>(
  fn: Pred<TArgs>,
  onTrue: (...args: TArgs) => TOnTrueResult,
  onFalse: (...args: TArgs) => TOnFalseResult,
): (...args: TArgs) => TOnTrueResult | TOnFalseResult;
