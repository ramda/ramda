import { ToTupleOfArray, ToTupleOfFunction } from './util/tools';

export function lift<F extends (...args: readonly any[]) => any>(
    fn: F,
): {
    (...args: ToTupleOfArray<Parameters<F>>): Array<ReturnType<F>>;
    <R>(...args: ToTupleOfFunction<R, Parameters<F>>): (arg: R) => ReturnType<F>;
};