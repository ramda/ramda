import { Ordering } from './util/tools';

export function comparator<T>(pred: (a: T, b: T) => boolean): (x: T, y: T) => Ordering;
