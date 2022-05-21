import * as _ from 'ts-toolbelt';

export function reduceBy<T, TResult>(
    valueFn: (acc: TResult, elem: T) => TResult,
    acc: TResult,
    keyFn: (elem: T) => string,
    list: readonly T[],
): { [index: string]: TResult };
export function reduceBy<T, TResult>(
    valueFn: (acc: TResult, elem: T) => TResult,
    acc: TResult,
    keyFn: (elem: T) => string,
): (list: readonly T[]) => { [index: string]: TResult };
export function reduceBy<T, TResult>(
    valueFn: (acc: TResult, elem: T) => TResult,
    acc: TResult,
): _.F.Curry<(a: (elem: T) => string, b: readonly T[]) => { [index: string]: TResult }>;
export function reduceBy<T, TResult>(
    valueFn: (acc: TResult, elem: T) => TResult,
): _.F.Curry<(a: TResult, b: (elem: T) => string, c: readonly T[]) => { [index: string]: TResult }>;