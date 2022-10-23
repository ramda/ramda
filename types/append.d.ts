import { Placeholder } from './util/tools';

export function append<T>(__: Placeholder, list: readonly T[]): (el: T) => T[];
export function append<T>(el: T, list: readonly T[]): T[];
export function append<T>(el: T): (list: readonly T[]) => T[];
