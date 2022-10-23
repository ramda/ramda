import { PartialRecord } from './util/tools';

export function mapObjIndexed<T, TResult, TKey extends string>(
  fn: (value: T, key: TKey, obj?: Record<TKey, T>) => TResult,
  obj: Record<TKey, T>,
): Record<TKey, TResult>;
export function mapObjIndexed<T, TResult, TKey extends string>(
  fn: (value: T, key: TKey, obj?: Record<TKey, T>) => TResult,
  obj: PartialRecord<TKey, T>,
): PartialRecord<TKey, TResult>;
export function mapObjIndexed<T, TResult, TKey extends string>(
  fn: (value: T, key: TKey, obj?: Record<TKey, T>) => TResult,
): (obj: Record<TKey, T>) => Record<TKey, TResult>;
export function mapObjIndexed<T, TResult, TKey extends string>(
  fn: (value: T, key: TKey, obj?: PartialRecord<TKey, T>) => TResult,
): (obj: Record<TKey, T>) => PartialRecord<TKey, TResult>;
export function mapObjIndexed<T, TResult>(
  fn: (
    value: T,
    key: string,
    obj?: {
      [key: string]: T;
    },
  ) => TResult,
  obj: {
    [key: string]: T;
  },
): {
  [key: string]: TResult;
};
