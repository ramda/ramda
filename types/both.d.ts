import { PredTypeguard, Pred } from './util/tools';

export function both<T, TF1 extends T, TF2 extends T>(
    pred1: PredTypeguard<T, TF1>,
    pred2: PredTypeguard<T, TF2>,
): (a: T) => a is TF1 & TF2;
export function both<T extends Pred>(pred1: T, pred2: T): T;
export function both<T extends Pred>(pred1: T): (pred2: T) => T;