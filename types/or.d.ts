import { Falsy } from './util/tools';

export function or<T, U>(a: T | Falsy, b: U): T | U;
export function or<T>(a: T | Falsy): <U>(b: U) => T | U;