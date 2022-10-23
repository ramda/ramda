export function apply<F extends (...args: readonly any[]) => any>(fn: F, args: Parameters<F>): ReturnType<F>;
export function apply<F extends (...args: readonly any[]) => any>(fn: F): (args: Parameters<F>) => ReturnType<F>;
