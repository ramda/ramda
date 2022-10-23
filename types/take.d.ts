export function take<T>(n: number, xs: readonly T[]): T[];
export function take(n: number, xs: string): string;
export function take(n: number): {
  (xs: string): string;
  <T>(xs: readonly T[]): T[];
};
export function take<T>(n: number): (xs: readonly T[]) => T[];
