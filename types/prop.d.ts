import { Placeholder } from './util/tools';

export function prop<T>(__: Placeholder, obj: T): <P extends keyof T>(p: P) => T[P];
export function prop<P extends keyof T, T>(p: P, obj: T): T[P];
export function prop<P extends string>(p: P): <T>(obj: Record<P, T>) => T;
export function prop<P extends string, T>(p: P): (obj: Record<P, T>) => T;