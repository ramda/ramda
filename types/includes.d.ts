import { Placeholder } from './util/tools';

export function includes(__: Placeholder, list: readonly string[] | string): (s: string) => boolean;
export function includes<T>(__: Placeholder, list: readonly T[]): (target: T) => boolean;
export function includes(__: Placeholder): (list: readonly string[] | string, s: string) => boolean;
export function includes<T>(__: Placeholder): (list: readonly T[], target: T) => boolean;
export function includes(s: string, list: readonly string[] | string): boolean;
export function includes(s: string): (list: readonly string[] | string) => boolean;
export function includes<T>(target: T, list: readonly T[]): boolean;
export function includes<T>(target: T): (list: readonly T[]) => boolean;