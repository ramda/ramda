import { Placeholder } from './util/tools';

// apply(args, fn)
// only way to automatically constrain `fn` here is if `args` was an `[] as const`
export function apply<A extends readonly any[]>(__: Placeholder, args: A): <F extends (...args: A) => any>(fn: F) => ReturnType<F>;
// apply(args, fn)
export function apply<F extends (...args: readonly any[]) => any>(fn: F, args: Parameters<F>): ReturnType<F>;
// apply(args)(fn)
export function apply<F extends (...args: readonly any[]) => any>(fn: F): (args: Parameters<F>) => ReturnType<F>;
