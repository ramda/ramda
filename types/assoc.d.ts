import { Placeholder } from './util/tools';

// assoc(__, val, obj)(prop), this tests if prop is keyof obj and if val is typeof obj[prop] for best return type
export function assoc<T, U>(__: Placeholder, val: T, obj: U): <K extends string>(prop: K) => K extends keyof U ? T extends U[K] ? U : Record<K, T> & Omit<U, K> : U & Record<K, T>;
// assoc(prop, __, obj)(val), when K is keyof obj, tests if val is typeof obj[prop] for best return type
export function assoc<U, K extends keyof U>(prop: K, __: Placeholder, obj: U): <T>(val: T) => T extends U[K] ? U : Record<K, T> & Omit<U, K>;
// assoc(prop, __, obj)(val), when prop is not keyof obj
export function assoc<U, K extends string>(prop: K, __: Placeholder, obj: U): <T>(val: T) => U & Record<K, T>;
// assoc(prop, val, obj) when prop is keyof obj and val is same type
export function assoc<K extends keyof U, U>(prop: K, val: U[K], obj: U): U;
// assoc(prop, val, obj) when prop is keyof obj  and val is not same type
export function assoc<T, K extends keyof U, U>(prop: K, val: T, obj: U): Record<K, T> & Omit<U, K>;
// assoc(prop, val, obj) when prop is not keyof obj
export function assoc<T, U, K extends string>(prop: K, val: T, obj: U): U & Record<K, T>;

// assoc(__, val)
export function assoc<T>(__: Placeholder, val: T) : {
  // assoc(__, val)(__, obj)
  <U>(__2: Placeholder, obj: U): {
    // assoc(__, val)(__, obj)(prop), prop is keyof obj, tests if val is typeof obj[prop] for best return type
    <K extends keyof U>(prop: K): U[K] extends T ? U : Record<K, T> & Omit<U, K>;
    // assoc(__, val)(__, obj)(prop), prop is not keyof obj
    <K extends string>(prop: K): U & Record<K, T>;
  };
  // assoc(__, val)(prop, obj), when obj has key prop, tests if val is typeof obj[prop] for best return type
  <K extends keyof U, U>(prop: K, obj: U): U[K] extends T ? U : Record<K, T> & Omit<U, K>;
  // assoc(__, val)(prop, obj), when obj does not have key prop
  <K extends string, U>(prop: K, obj: U): U & Record<K, T>;

  // assoc(__, val)(prop)
  <K extends string>(prop: K): {
    // assoc(__, val)(prop)(obj) when obj has key prop, tests if val is typeof obj[prop] for best return type
    <U extends Record<K, any>>(obj: U): U[K] extends T ? U : Record<K, T> & Omit<U, K>;
    // assoc(__, val)(prop)(obj) when obj does not have key prop
    <U>(obj: U): U & Record<K, T>;
  }
}

// assoc(prop, val)
export function assoc<T, K extends string>(prop: K, val: T) : {
  // assoc(prop, val)(obj), when obj has key prop, tests if val is typeof obj[prop] for best return type
  <U extends Record<K, any>>(obj: U): U[K] extends T ? U : Record<K, T> & Omit<U, K>;
  // assoc(prop, val)(obj), when obj does not have key prop
  <U>(obj: U): U & Record<K, T>;
}

// assoc(prop)
export function assoc<K extends string>(prop: K): {
  // assoc(prop)(__, obj) when prop is keyof obj
  <U extends Record<K, any>>(__: Placeholder, obj: U): {
    // assoc(prop)(__, obj)(val) if val is typeof obj[prop]
    <T extends U[K]>(val: T): U;
    // assoc(prop)(__, obj)(val) if val is not typeof obj[prop]
    <T>(val: T): Record<K, T> & Omit<U, K>;
  }
  // assoc(prop)(__, obj) when prop is not keyof obj
  <U>(__: Placeholder, obj: U): <T>(val: T) => U & Record<K, T>;

  // assoc(prop)(val, obj) when obj has key prop, tests if val is typeof obj[prop] for best return type
  <T, U extends Record<K, any>>(val: T, obj: U): U[K] extends T ? U : Record<K, T> & Omit<U, K>;
  // assoc(prop)(val, obj) when obj does not have a key prop
  <T, U>(val: T, obj: U): U & Record<K, T>;

  // assoc(prop)(val)
  <T>(val: T): {
    // assoc(prop)(val)(obj) when obj has key prop and val is typeof obj[prop]
    <U extends Record<K, T>>(obj: U): U;
    // assoc(prop)(val)(obj) when obj has key prop and val is not typeof obj[prop]
    <U extends Record<K, any>>(obj: U): Record<K, T> & Omit<U, K>;
    // assoc(prop)(val)(obj) when obj does not have key prop
    <U>(obj: U): U & Record<K, T>;
  }
};
