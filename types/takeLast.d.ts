export function takeLast<T>(n: number, xs: readonly T[]): T[];
export function takeLast(n: number, xs: string): string;
export function takeLast(n: number): {
  (xs: string): string;
  <T>(xs: readonly T[]): T[];
};
