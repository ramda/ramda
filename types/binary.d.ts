import * as _ from 'ts-toolbelt';
import { Take } from './util/tools';

export function binary<T extends (...arg: any) => any>(fn: T): (...arg: _.T.Take<Parameters<T>, '2'>) => ReturnType<T>;