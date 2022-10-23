import { CondPairTypeguard, CondPair } from './util/tools';

export function cond<T, TF1 extends T, R>(pairs: [CondPairTypeguard<T, TF1, R>]): (value: T) => R;
export function cond<T, TF1 extends T, TF2 extends T, R>(
  pairs: [CondPairTypeguard<T, TF1, R>, CondPairTypeguard<T, TF2, R>],
): (value: T) => R;
export function cond<T, TF1 extends T, TF2 extends T, TF3 extends T, R>(
  pairs: [CondPairTypeguard<T, TF1, R>, CondPairTypeguard<T, TF2, R>, CondPairTypeguard<T, TF3, R>],
): (value: T) => R;
export function cond<T, TF1 extends T, TF2 extends T, TF3 extends T, TF4 extends T, R>(
  pairs: [
    CondPairTypeguard<T, TF1, R>,
    CondPairTypeguard<T, TF2, R>,
    CondPairTypeguard<T, TF3, R>,
    CondPairTypeguard<T, TF4, R>
  ],
): (value: T) => R;
export function cond<T, TF1 extends T, TF2 extends T, TF3 extends T, TF4 extends T, TF5 extends T, R>(
  pairs: [
    CondPairTypeguard<T, TF1, R>,
    CondPairTypeguard<T, TF2, R>,
    CondPairTypeguard<T, TF3, R>,
    CondPairTypeguard<T, TF4, R>,
    CondPairTypeguard<T, TF5, R>
  ],
): (value: T) => R;
export function cond<T, TF1 extends T, TF2 extends T, TF3 extends T, TF4 extends T, TF5 extends T, TF6 extends T, R>(
  pairs: [
    CondPairTypeguard<T, TF1, R>,
    CondPairTypeguard<T, TF2, R>,
    CondPairTypeguard<T, TF3, R>,
    CondPairTypeguard<T, TF4, R>,
    CondPairTypeguard<T, TF5, R>,
    CondPairTypeguard<T, TF6, R>
  ],
): (value: T) => R;
export function cond<
  T,
  TF1 extends T,
  TF2 extends T,
  TF3 extends T,
  TF4 extends T,
  TF5 extends T,
  TF6 extends T,
  TF7 extends T,
  R
>(
  pairs: [
    CondPairTypeguard<T, TF1, R>,
    CondPairTypeguard<T, TF2, R>,
    CondPairTypeguard<T, TF3, R>,
    CondPairTypeguard<T, TF4, R>,
    CondPairTypeguard<T, TF5, R>,
    CondPairTypeguard<T, TF6, R>,
    CondPairTypeguard<T, TF7, R>
  ],
): (value: T) => R;
export function cond<
  T,
  TF1 extends T,
  TF2 extends T,
  TF3 extends T,
  TF4 extends T,
  TF5 extends T,
  TF6 extends T,
  TF7 extends T,
  TF8 extends T,
  R
>(
  pairs: [
    CondPairTypeguard<T, TF1, R>,
    CondPairTypeguard<T, TF2, R>,
    CondPairTypeguard<T, TF3, R>,
    CondPairTypeguard<T, TF4, R>,
    CondPairTypeguard<T, TF5, R>,
    CondPairTypeguard<T, TF6, R>,
    CondPairTypeguard<T, TF7, R>,
    CondPairTypeguard<T, TF8, R>
  ],
): (value: T) => R;
export function cond<
  T,
  TF1 extends T,
  TF2 extends T,
  TF3 extends T,
  TF4 extends T,
  TF5 extends T,
  TF6 extends T,
  TF7 extends T,
  TF8 extends T,
  TF9 extends T,
  R
>(
  pairs: [
    CondPairTypeguard<T, TF1, R>,
    CondPairTypeguard<T, TF2, R>,
    CondPairTypeguard<T, TF3, R>,
    CondPairTypeguard<T, TF4, R>,
    CondPairTypeguard<T, TF5, R>,
    CondPairTypeguard<T, TF6, R>,
    CondPairTypeguard<T, TF7, R>,
    CondPairTypeguard<T, TF8, R>,
    CondPairTypeguard<T, TF9, R>
  ],
): (value: T) => R;
export function cond<
  T,
  TF1 extends T,
  TF2 extends T,
  TF3 extends T,
  TF4 extends T,
  TF5 extends T,
  TF6 extends T,
  TF7 extends T,
  TF8 extends T,
  TF9 extends T,
  TF10 extends T,
  R
>(
  pairs: [
    CondPairTypeguard<T, TF1, R>,
    CondPairTypeguard<T, TF2, R>,
    CondPairTypeguard<T, TF3, R>,
    CondPairTypeguard<T, TF4, R>,
    CondPairTypeguard<T, TF5, R>,
    CondPairTypeguard<T, TF6, R>,
    CondPairTypeguard<T, TF7, R>,
    CondPairTypeguard<T, TF8, R>,
    CondPairTypeguard<T, TF9, R>,
    CondPairTypeguard<T, TF10, R>
  ],
): (value: T) => R;
export function cond<T extends any[], R>(pairs: Array<CondPair<T, R>>): (...args: T) => R;
