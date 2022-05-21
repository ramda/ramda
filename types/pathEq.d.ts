import * as _ from 'ts-toolbelt';
import { Path } from './util/tools';

export function pathEq(path: Path, val: any, obj: any): boolean;
export function pathEq(path: Path, val: any): (obj: any) => boolean;
export function pathEq(path: Path): _.F.Curry<(a: any, b: any) => boolean>;