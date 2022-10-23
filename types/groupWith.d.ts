export function groupWith<T>(fn: (x: T, y: T) => boolean): (list: readonly T[]) => T[][];
export function groupWith<T>(fn: (x: T, y: T) => boolean, list: readonly T[]): T[][];
export function groupWith<T>(fn: (x: T, y: T) => boolean, list: string): string[];
