import { InputTypesOfFns, ReturnTypesOfFns } from './util/tools';

export function useWith<
    TArg1,
    TR1,
    TArg2,
    TR2,
    TArg3,
    TR3,
    TArg4,
    TR4,
    TArg5,
    TR5,
    TArg6,
    TR6,
    TArg7,
    TR7,
    TResult,
    RestFunctions extends Array<(...args: any[]) => any>,
    TArgs extends [TArg1, TArg2, TArg3, TArg4, TArg5, TArg6, TArg7, ...InputTypesOfFns<RestFunctions>],
>(
    fn: (...args: [TR1, TR2, TR3, TR4, TR5, TR6, TR7, ...ReturnTypesOfFns<RestFunctions>]) => TResult,
    transformers: [
        (arg: TArg1) => TR1,
        (arg: TArg2) => TR2,
        (arg: TArg3) => TR3,
        (arg: TArg4) => TR4,
        (arg: TArg5) => TR5,
        (arg: TArg6) => TR6,
        (arg: TArg7) => TR7,
        ...RestFunctions,
    ],
): (...args: TArgs) => TResult;
export function useWith<TArg1, TR1, TArg2, TR2, TArg3, TR3, TArg4, TR4, TArg5, TR5, TArg6, TR6, TArg7, TR7, TResult>(
    fn: (...args: [TR1, TR2, TR3, TR4, TR5, TR6, TR7] & { length: 7 }) => TResult,
    transformers: [
        (arg: TArg1) => TR1,
        (arg: TArg2) => TR2,
        (arg: TArg3) => TR3,
        (arg: TArg4) => TR4,
        (arg: TArg5) => TR5,
        (arg: TArg6) => TR6,
        (arg: TArg7) => TR7,
    ],
): (...args: [TArg1, TArg2, TArg3, TArg4, TArg5, TArg7]) => TResult;
export function useWith<TArg1, TR1, TArg2, TR2, TArg3, TR3, TArg4, TR4, TArg5, TR5, TArg6, TR6, TResult>(
    fn: (...args: [TR1, TR2, TR3, TR4, TR5, TR6] & { length: 6 }) => TResult,
    transformers: [
        (arg: TArg1) => TR1,
        (arg: TArg2) => TR2,
        (arg: TArg3) => TR3,
        (arg: TArg4) => TR4,
        (arg: TArg5) => TR5,
        (arg: TArg6) => TR6,
    ],
): (...args: [TArg1, TArg2, TArg3, TArg4, TArg5, TArg6]) => TResult;
export function useWith<TArg1, TR1, TArg2, TR2, TArg3, TR3, TArg4, TR4, TArg5, TR5, TResult>(
    fn: (...args: [TR1, TR2, TR3, TR4, TR5] & { length: 5 }) => TResult,
    transformers: [
        (arg: TArg1) => TR1,
        (arg: TArg2) => TR2,
        (arg: TArg3) => TR3,
        (arg: TArg4) => TR4,
        (arg: TArg5) => TR5,
    ],
): (...args: [TArg1, TArg2, TArg3, TArg4, TArg5]) => TResult;
export function useWith<TArg1, TR1, TArg2, TR2, TArg3, TR3, TArg4, TR4, TResult>(
    fn: (...args: [TR1, TR2, TR3, TR4] & { length: 4 }) => TResult,
    transformers: [(arg: TArg1) => TR1, (arg: TArg2) => TR2, (arg: TArg3) => TR3, (arg: TArg4) => TR4],
): (...args: [TArg1, TArg2, TArg3, TArg4]) => TResult;
export function useWith<TArg1, TR1, TArg2, TR2, TArg3, TR3, TResult>(
    fn: (...args: [TR1, TR2, TR3] & { length: 3 }) => TResult,
    transformers: [(arg: TArg1) => TR1, (arg: TArg2) => TR2, (arg: TArg3) => TR3],
): (...args: [TArg1, TArg2, TArg3]) => TResult;
export function useWith<TArg1, TR1, TArg2, TR2, TResult>(
    fn: (...args: [TR1, TR2] & { length: 2 }) => TResult,
    transformers: [(arg: TArg1) => TR1, (arg: TArg2) => TR2],
): (...args: [TArg1, TArg2]) => TResult;
export function useWith<TArg1, TR1, TResult>(
    fn: (...args: [TR1]) => TResult,
    transformers: [(arg: TArg1) => TR1],
): (...args: [TArg1]) => TResult;