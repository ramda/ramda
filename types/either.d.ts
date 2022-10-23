import { Pred } from './util/tools';

export function either<T extends Pred>(pred1: T, pred2: T): T;
export function either<T extends Pred>(pred1: T): (pred2: T) => T;
