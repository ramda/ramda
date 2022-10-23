export function splitAt<T>(index: number, list: readonly T[]): [T[], T[]];
export function splitAt(index: number, list: string): [string, string];
export function splitAt(index: number): {
  <T>(list: readonly T[]): [T[], T[]];
  (list: string): [string, string];
};
