export function partition(fn: (a: string) => boolean, list: readonly string[]): [string[], string[]];
export function partition<T>(fn: (a: T) => boolean, list: readonly T[]): [T[], T[]];
export function partition<T>(fn: (a: T) => boolean): (list: readonly T[]) => [T[], T[]];
export function partition(fn: (a: string) => boolean): (list: readonly string[]) => [string[], string[]];