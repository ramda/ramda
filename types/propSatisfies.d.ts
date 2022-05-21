import * as _ from 'ts-toolbelt';

export function propSatisfies<P, K extends keyof any>(
    pred: (val: any) => val is P,
    name: K,
    obj: any,
): obj is Record<K, P>;
export function propSatisfies<P, K extends keyof any>(
    pred: (val: any) => val is P,
    name: K,
): (obj: any) => obj is Record<K, P>;
export function propSatisfies<P>(pred: (val: any) => val is P): {
    <K extends keyof any>(name: K, obj: any): obj is Record<K, P>;
    <K extends keyof any>(name: K): (obj: any) => obj is Record<K, P>;
};
export function propSatisfies(pred: (val: any) => boolean, name: keyof any, obj: any): boolean;
export function propSatisfies(pred: (val: any) => boolean, name: keyof any): (obj: any) => boolean;
export function propSatisfies(pred: (val: any) => boolean): _.F.Curry<(a: keyof any, b: any) => boolean>;