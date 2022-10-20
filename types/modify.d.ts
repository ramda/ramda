import * as _ from 'ts-toolbelt';

import { Placeholder } from './util/tools';

export function modify<T, K extends keyof T, P>(prop: K, fn: (a: T[K]) => P, obj: T): Omit<T, K> & Record<K, P>;
export function modify<T, A, P>(__: Placeholder, fn: (a: A) => P, obj: T): <K extends keyof T>(prop: K) => Omit<T, K> & Record<K, P>;
export function modify<T, K extends keyof T>(prop: K, __: Placeholder, obj: T): <P>(fn: (a: T[K]) => P) => Omit<T, K> & Record<K, P>;
export function modify<T, K extends keyof T, P>(__: Placeholder, __2: Placeholder, obj: T): _.F.Curry<(prop: K, fn: (a: T[K]) => P) => Omit<T, K> & Record<K, P>>;
export function modify<K extends string, P, A>(prop: K, fn: (a: A) => P): <T extends Record<K, A>>(obj: T) => Omit<T, K> & Record<K, P>;
export function modify<T, K extends keyof T, P>(__: Placeholder, fn: (a: T[K]) => P): _.F.Curry<(prop: K, obj: T) => Omit<T, K> & Record<K, P>>;
export function modify<T, K extends keyof T, P>(prop: K): _.F.Curry<(fn: (a: T[K]) => P, obj: T) => Omit<T, K> & Record<K, P>>;
