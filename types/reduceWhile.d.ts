import * as _ from 'ts-toolbelt';

export function reduceWhile<T, TResult>(
    predicate: (acc: TResult, elem: T) => boolean,
    fn: (acc: TResult, elem: T) => TResult,
    acc: TResult,
    list: readonly T[],
): TResult;
export function reduceWhile<T, TResult>(
    predicate: (acc: TResult, elem: T) => boolean,
    fn: (acc: TResult, elem: T) => TResult,
    acc: TResult,
): (list: readonly T[]) => TResult;
export function reduceWhile<T, TResult>(
    predicate: (acc: TResult, elem: T) => boolean,
    fn: (acc: TResult, elem: T) => TResult,
): _.F.Curry<(a: TResult, b: readonly T[]) => TResult>;
export function reduceWhile<T, TResult>(
    predicate: (acc: TResult, elem: T) => boolean,
): _.F.Curry<(a: (acc: TResult, elem: T) => TResult, b: TResult, c: readonly T[]) => TResult>;