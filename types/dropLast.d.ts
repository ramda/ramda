export function dropLast<T>(n: number, xs: readonly T[]): T[];
export function dropLast(n: number, xs: string): string;
export function dropLast<T>(n: number): {
    (xs: readonly T[]): T[];
    (xs: string): string;
};