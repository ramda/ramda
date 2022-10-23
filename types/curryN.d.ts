import * as _ from 'ts-toolbelt';
import { Take } from './util/tools';

export function curryN<N extends number, F extends (...args: any) => any>(
  length: N,
  fn: F,
): _.F.Curry<(...a: _.T.Take<Parameters<F>, _.N.NumberOf<N>>) => ReturnType<F>>;
export function curryN<N extends number>(
  length: N,
): <F extends (...args: any) => any>(
  fn: F,
) => _.F.Curry<(...a: _.T.Take<Parameters<F>, _.N.NumberOf<N>>) => ReturnType<F>>;
