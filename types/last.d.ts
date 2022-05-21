export function last(str: string): string;
export function last(list: readonly []): undefined;
export function last<T extends any>(list: readonly T[]): T | undefined;