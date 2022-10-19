import { F } from 'ts-toolbelt';

import { Placeholder } from './util/tools';

// if type of prop remains same through fn, return type should remain T (where we can)
// (prop, fn, obj) => T
declare function modify<T, K extends keyof T>(prop: K, fn: (a: T[K]) => T[K], obj: T): T;
// (__, fn, obj) => (prop) => T
declare function modify<T, K extends keyof T>(__: Placeholder, fn: (a: T[K]) => T[K], obj: T): (prop: K) => T;

// else, Omit<T, K> & Record<K, P>
// (prop, fn, obj) => Omit<T, K> & Record<K, P>
declare function modify<T, K extends keyof T, P>(prop: K, fn: (a: T[K]) => P, obj: T): Omit<T, K> & Record<K, P>;
// (__, fn, obj) => (prop) => Omit<T, K> & Record<K, P>
declare function modify<T, K extends keyof T, P>(__: Placeholder, fn: (a: T[K]) => P, obj: T): (prop: K) => Omit<T, K> & Record<K, P>;
// (prop, __, obj) => (fn) => Omit<T, K> & Record<K, P>
declare function modify<T, K extends keyof T, P>(prop: K, __: Placeholder, obj: T): (fn: (a: T[K]) => P) => Omit<T, K> & Record<K, P>;
// (__, __, obj) => (prop, fn) => T and (__, __, obj) => (prop) => (fn) => T
declare function modify<T, K extends keyof T, P>(__: Placeholder, __2: Placeholder, obj: T): F.Curry<(prop: K, fn: (a: T[K]) => P) => Omit<T, K> & Record<K, P>>;
// (prop, fn) => (obj) => T
declare function modify<K extends string, P, A>(prop: K, fn: (a: A) => P): <T extends Record<K, A>>(obj: T) => Omit<T, K> & Record<K, P>;
// (__, fn) => (prop, obj) => T and (__, fn) => (prop) => (obj) => T
declare function modify<T, K extends keyof T, P>(__: Placeholder, fn: (a: T[K]) => P): F.Curry<(prop: K, obj: T) => Omit<T, K> & Record<K, P>>;
// (prop) => (fn, obj) => T and (prop) => (fn) => (obj) => T
declare function modify<T, K extends keyof T, P>(prop: K): F.Curry<(fn: (a: T[K]) => P, obj: T) => Omit<T, K> & Record<K, P>>;

// fall back to return type T for when only 2 generics are specified
// (prop, __, obj) => (fn) => Omit<T, K> & Record<K, P>
declare function modify<T, K extends keyof T>(prop: K, __: Placeholder, obj: T): (fn: (a: T[K]) => T[K]) => T;
// (__, __, obj) => (prop, fn) => T and (__, __, obj) => (prop) => (fn) => T
declare function modify<T, K extends keyof T>(__: Placeholder, __2: Placeholder, obj: T): F.Curry<(prop: K, fn: (a: T[K]) => T[K]) => T>;
// (prop, fn) => (obj) => T
declare function modify<T, K extends keyof T>(prop: K, fn: (a: T[K]) => T[K]): (obj: T) => T;
// (__, fn) => (prop, obj) => T and (__, fn) => (prop) => (obj) => T
declare function modify<T, K extends keyof T>(__: Placeholder, fn: (a: T[K]) => T[K]): F.Curry<(prop: K, obj: T) => T>;
// (prop) => (fn, obj) => T and (prop) => (fn) => (obj) => T
declare function modify<T, K extends keyof T>(prop: K): F.Curry<(fn: (a: T[K]) => T[K], obj: T) => T>;
