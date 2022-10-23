import * as _ from 'ts-toolbelt';
import { Path } from './util/tools';

export function pathSatisfies<T, U>(pred: (val: T) => boolean, path: Path, obj: U): boolean;
export function pathSatisfies<T, U>(pred: (val: T) => boolean, path: Path): (obj: U) => boolean;
export function pathSatisfies<T, U>(pred: (val: T) => boolean): _.F.Curry<(a: Path, b: U) => boolean>;
