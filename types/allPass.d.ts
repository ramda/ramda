import { PredTypeguard, Pred } from './util/tools';

export function allPass<T, TF1 extends T, TF2 extends T>(
    preds: [PredTypeguard<T, TF1>, PredTypeguard<T, TF2>],
): (a: T) => a is TF1 & TF2;
export function allPass<T, TF1 extends T, TF2 extends T, TF3 extends T>(
    preds: [PredTypeguard<T, TF1>, PredTypeguard<T, TF2>, PredTypeguard<T, TF3>],
): (a: T) => a is TF1 & TF2 & TF3;
export function allPass<T, TF1 extends T, TF2 extends T, TF3 extends T>(
    preds: [PredTypeguard<T, TF1>, PredTypeguard<T, TF2>, PredTypeguard<T, TF3>],
): (a: T) => a is TF1 & TF2 & TF3;
export function allPass<T, TF1 extends T, TF2 extends T, TF3 extends T, TF4 extends T>(
    preds: [PredTypeguard<T, TF1>, PredTypeguard<T, TF2>, PredTypeguard<T, TF3>, PredTypeguard<T, TF4>],
): (a: T) => a is TF1 & TF2 & TF3 & TF4;
export function allPass<T, TF1 extends T, TF2 extends T, TF3 extends T, TF4 extends T, TF5 extends T>(
    preds: [
        PredTypeguard<T, TF1>,
        PredTypeguard<T, TF2>,
        PredTypeguard<T, TF3>,
        PredTypeguard<T, TF4>,
        PredTypeguard<T, TF5>,
    ],
): PredTypeguard<T, TF1 & TF2 & TF3 & TF4 & TF5>;
export function allPass<T, TF1 extends T, TF2 extends T, TF3 extends T, TF4 extends T, TF5 extends T, TF6 extends T>(
    preds: [
        PredTypeguard<T, TF1>,
        PredTypeguard<T, TF2>,
        PredTypeguard<T, TF3>,
        PredTypeguard<T, TF4>,
        PredTypeguard<T, TF5>,
        PredTypeguard<T, TF6>,
    ],
): PredTypeguard<T, TF1 & TF2 & TF3 & TF4 & TF5 & TF6>;
export function allPass<F extends Pred>(preds: readonly F[]): F;