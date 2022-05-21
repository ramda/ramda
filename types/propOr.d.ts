import { Placeholder } from './util/tools';

export function propOr<T, U>(val: T, __: Placeholder, obj: U): <V>(p: string) => V;
export function propOr<U>(__: Placeholder, p: string, obj: U): <T, V>(val: T) => V;
export function propOr<T, U, V>(val: T, p: string, obj: U): V;
export function propOr<T>(val: T, p: string): <U, V>(obj: U) => V;
export function propOr<T>(val: T): <U, V>(p: string, obj: U) => V;