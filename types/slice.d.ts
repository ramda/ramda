export function slice(a: number, b: number, list: string): string;
export function slice<T>(a: number, b: number, list: readonly T[]): T[];
export function slice(
    a: number,
    b: number,
): {
    <T>(list: readonly T[]): T[];
    (list: string): string;
};
export function slice(a: number): {
    <T>(b: number, list: readonly T[]): T[];
    (b: number, list: string): string;
};