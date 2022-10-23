import { ObjPred } from './util/tools';

export function pickBy<T, U>(pred: ObjPred<T>, obj: T): U;
export function pickBy<T>(pred: ObjPred<T>): <U, V extends T>(obj: V) => U;
