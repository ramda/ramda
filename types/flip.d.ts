import * as _ from 'ts-toolbelt';
import { Merge } from './util/tools';

export function flip<T, U, TResult>(fn: (arg0: T, arg1: U) => TResult): (arg1: U, arg0?: T) => TResult;
export function flip<F extends (...args: any) => any, P extends _.F.Parameters<F>>(
    fn: F,
): _.F.Curry<(...args: _.T.Merge<[P[1], P[0]], P>) => _.F.Return<F>>;