import * as _ from 'ts-toolbelt';

export function unionWith<T>(pred: (a: T, b: T) => boolean, list1: readonly T[], list2: readonly T[]): T[];
export function unionWith<T>(pred: (a: T, b: T) => boolean): _.F.Curry<(a: readonly T[], b: readonly T[]) => T[]>;