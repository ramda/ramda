export function drop<T>(n: number, xs: readonly T[]): T[];
export function drop(n: number, xs: string): string;
export function drop<T>(n: number): {
    (xs: string): string;
    (xs: readonly T[]): T[];
};