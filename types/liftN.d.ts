import { Take, ToTupleOfArray, ToTupleOfFunction } from './util/tools';

export function liftN<N extends number, F extends (...args: readonly any[]) => any>(
  n: N,
  fn: F,
): {
  (...args: Take<N, ToTupleOfArray<Parameters<F>>>): Array<ReturnType<F>>;
  <R>(...args: Take<N, ToTupleOfFunction<R, Parameters<F>>>): (arg: R) => ReturnType<F>;
};
