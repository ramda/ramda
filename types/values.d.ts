import { ValueOfUnion } from './util/tools';

export function values<T extends object, K extends keyof T>(obj: T): Array<T[K] | ValueOfUnion<T>>;
