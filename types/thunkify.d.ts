import * as _ from 'ts-toolbelt';

export function thunkify<F extends (...args: readonly any[]) => any>(
  fn: F,
): _.F.Curry<(...args: Parameters<F>) => () => ReturnType<F>>;
