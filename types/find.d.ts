export function find<T, P extends T>(pred: (val: T) => val is P, list: readonly T[]): P | undefined;
export function find<T>(pred: (val: T) => boolean, list: readonly T[]): T | undefined;
export function find<T, P extends T>(pred: (val: T) => val is P): (list: readonly T[]) => P | undefined;
export function find<T>(pred: (val: T) => boolean): (list: readonly T[]) => T | undefined;
