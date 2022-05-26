import * as _ from 'ts-toolbelt';
import { Placeholder, Path } from './util/tools';

export function assocPath<T, U>(__: Placeholder, val: T, obj: U): (path: Path) => U;
export function assocPath<T, U>(path: Path, __: Placeholder, obj: U): (val: T) => U;
export function assocPath<T, U>(path: Path, val: T, obj: U): U;
export function assocPath<T, U>(path: Path, val: T): (obj: U) => U;
export function assocPath<T, U>(path: Path): _.F.Curry<(a: T, b: U) => U>;