import * as _ from 'ts-toolbelt';
import { Take } from './util/tools';

export function nAry<N extends number, T extends (...arg: any) => any>(
    n: N,
    fn: T,
): (...arg: _.T.Take<Parameters<T>, _.N.NumberOf<N>>) => ReturnType<T>;
export function nAry<N extends number>(
    n: N,
): <T extends (...arg: any) => any>(fn: T) => (...arg: _.T.Take<Parameters<T>, _.N.NumberOf<N>>) => ReturnType<T>;