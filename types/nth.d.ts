export function nth<T>(n: number, list: readonly T[]): T | undefined;
export function nth(n: number, list: string): string;
export function nth(n: number): {
    <T>(list: readonly T[]): T | undefined;
    (list: string): string;
};