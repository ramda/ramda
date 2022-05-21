import { Placeholder } from './util/tools';

export function contains(__: Placeholder, list: string): (a: string) => boolean;
export function contains<T>(__: Placeholder, list: readonly T[]): (a: T) => boolean;
export function contains(__: Placeholder): (list: string, a: string) => boolean;
export function contains<T>(__: Placeholder): (list: readonly T[], a: T) => boolean;
export function contains(a: string, list: string): boolean;
export function contains<T>(a: T, list: readonly T[]): boolean;
export function contains(a: string): (list: string) => boolean;
export function contains<T>(a: T): (list: readonly T[]) => boolean;