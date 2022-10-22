import * as _ from 'ts-toolbelt';

import { Placeholder } from './util/tools';

// modify(prop, fn, obj)
export function modify<T, K extends keyof T, P>(prop: K, fn: (a: T[K]) => P, obj: T): Omit<T, K> & Record<K, P>;
// modify(__, fn, obj)(prop)
export function modify<T, A, P>(__: Placeholder, fn: (a: A) => P, obj: T): <K extends keyof T>(prop: K) => Omit<T, K> & Record<K, P>;
// modify(prop, __, obj)(prop)
export function modify<T, K extends keyof T>(prop: K, __: Placeholder, obj: T): <P>(fn: (a: T[K]) => P) => Omit<T, K> & Record<K, P>;
// modify(__, __, obj)(fn, prop) and modify(__, __)(fn)(prop)
export function modify<T>(__: Placeholder, __2: Placeholder, obj: T): {
  <K extends keyof T, P>(prop: K, fn: (a: T[K]) => P): Omit<T, K> & Record<K, P>;
  <K extends keyof T>(prop: K): <P>(fn: (a: T[K]) => P) => Omit<T, K> & Record<K, P>;
}
// modify(prop, fn)(obj), we can't know if prop is keyof obj is this case, but we can restrain obj to have prop as a key instead
export function modify<K extends string, P, A>(prop: K, fn: (a: A) => P): <T extends Record<K, A>>(obj: T) => Omit<T, K> & Record<K, P>;
// modify(_, fn)(prop, obj) and modify(_, fn)(prop)(obj)
export function modify<T, A, P>(__: Placeholder, fn: (a: A) => P): {
  <K extends string, T extends Record<K, A>>(prop: K, obj: T): Omit<T, K> & Record<K, P>;
  <K extends string>(prop: K): <T extends Record<K, A>>(obj: T) => Omit<T, K> & Record<K, P>;
}
// modify(prop)(fn, obj) and modify(prop)(fn)(obj)
export function modify<K extends string>(prop: K): {
  <T extends Record<K, A>, A, P>(fn: (a: A) => P, obj: T): Omit<T, K> & Record<K, P>
  <A, P>(fn: (a: A) => P): <T extends Record<K, A>>(obj: T) => Omit<T, K> & Record<K, P>;
};
