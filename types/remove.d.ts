export function remove<T>(start: number, count: number, list: readonly T[]): T[];
export function remove<T>(start: number): {
  (count: number, list: readonly T[]): T[];
  (count: number): (list: readonly T[]) => T[];
};
export function remove<T>(start: number, count: number): (list: readonly T[]) => T[];
