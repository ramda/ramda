
import * as _ from 'ts-toolbelt';
import { mergeArrWithLeft, Tuple } from './util/tools';

export function constructN<A extends any[], T, N extends number>(
    n: N,
    constructor: { new (...a: A): T } | ((...a: A) => T),
): _.F.Curry<(...a: mergeArrWithLeft<Tuple<any, N>, A>) => T>;