import { Placeholder } from './util/tools';

// pickAll (__, obj)
export function pickAll<T>(__: Placeholder, obj: T): {
  // pickAll (__, obj)(names) when all names are keyof obj
  <K extends keyof T>(names: readonly K[]): Pick<T, K>;
  // pickAll (__, obj)(names) if not all names are keyof obj
  <U>(names: string[]): U;
}

// pickAll(names, obj) when all names are keyof obj
export function pickAll<T, K extends keyof T>(names: readonly K[], obj: T): Pick<T, K>;
// pickAll(names, obj) if not all names are keyof obj
export function pickAll<T, U>(names: readonly string[], obj: T): U;

// pickAll(names)(obj) test names if all are keyof obj to return best type
export function pickAll<K extends readonly string[]>(names: K):
  <U, T = unknown>(obj: T) => K extends keyof T ? Pick<T, K> : U;

