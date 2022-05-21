import { Placeholder, AssocPartialOne } from './util/tools';

export function assoc<T, U>(__: Placeholder, val: T, obj: U): <K extends string>(prop: K) => Record<K, T> & Omit<U, K>;
export function assoc<U, K extends string>(prop: K, __: Placeholder, obj: U): <T>(val: T) => Record<K, T> & Omit<U, K>;
export function assoc<T, U, K extends string>(prop: K, val: T, obj: U): Record<K, T> & Omit<U, K>;
export function assoc<T, K extends string>(prop: K, val: T): <U>(obj: U) => Record<K, T> & Omit<U, K>;
export function assoc<K extends string>(prop: K): AssocPartialOne<K>;