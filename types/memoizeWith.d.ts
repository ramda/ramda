export function memoizeWith<T extends (...args: readonly any[]) => any>(
    keyFn: (...v: Parameters<T>) => string,
    fn: T,
): T;