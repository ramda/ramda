import { Placeholder } from './util/tools';

export function pickAll<T, K extends keyof T>(names: readonly K[], obj: T): Pick<T, K>;
export function pickAll<T, U>(names: readonly string[], obj: T): U;
export function pickAll(names: readonly string[]): <T, U>(obj: T) => U;

export function pickAll<T>(__: Placeholder, obj: T): {
  <K extends keyof T>(names: readonly K[]): Pick<T, K>;
  <U>(names: string[]): U;
}
