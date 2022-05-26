export function splitEvery<T>(a: number, list: readonly T[]): T[][];
export function splitEvery(a: number, list: string): string[];
export function splitEvery(a: number): {
    (list: string): string[];
    <T>(list: readonly T[]): T[][];
};