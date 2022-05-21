import * as _ from 'ts-toolbelt';
import { Path } from './util/tools';

export function pathOr<T>(defaultValue: T, path: Path, obj: any): T;
export function pathOr<T>(defaultValue: T, path: Path): (obj: any) => T;
export function pathOr<T>(defaultValue: T): _.F.Curry<(a: Path, b: any) => T>;