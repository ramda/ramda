export function head(str: string): string;
export function head(list: readonly []): undefined;
export function head<T extends any>(list: readonly T[]): T | undefined;
