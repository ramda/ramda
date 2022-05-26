import * as _ from 'ts-toolbelt';
import { Ord } from './util/tools';

export function maxBy<T>(keyFn: (a: T) => Ord, a: T, b: T): T;
export function maxBy<T>(keyFn: (a: T) => Ord, a: T): (b: T) => T;
export function maxBy<T>(keyFn: (a: T) => Ord): _.F.Curry<(a: T, b: T) => T>;