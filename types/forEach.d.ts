export function forEach<T>(fn: (x: T) => void, list: readonly T[]): T[];
export function forEach<T>(fn: (x: T) => void): (list: readonly T[]) => T[];
export function forEach<T>(fn: (x: T) => void, list: readonly T[]): T[];
export function forEach<T>(fn: (x: T) => void): (list: readonly T[]) => T[];
