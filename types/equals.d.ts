import { Placeholder } from './util/tools';

export function equals<T>(__: Placeholder, b: T): (a: T) => boolean;
export function equals<T>(a: T, b: T): boolean;
export function equals<T>(a: T): (b: T) => boolean;
