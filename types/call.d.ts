export function call<T extends (...args: readonly any[]) => any>(fn: T, ...args: Parameters<T>): ReturnType<T>;
