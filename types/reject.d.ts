import { Dictionary } from './util/tools';

export function reject<A, P extends A>(
    pred: (val: A) => val is P,
): {
    <B extends A>(list: readonly B[]): Array<Exclude<B, P>>;
    <B extends A>(dict: Dictionary<B>): Dictionary<Exclude<B, P>>;
};
export function reject<T>(
    pred: (value: T) => boolean,
): <P extends T, C extends readonly P[] | Dictionary<P>>(collection: C) => C;
export function reject<A, B extends A, P extends A>(
    pred: (val: A) => val is P,
    list: readonly B[],
): Array<Exclude<B, P>>;
export function reject<A, B extends A, P extends A>(
    pred: (val: A) => val is P,
    dict: Dictionary<B>,
): Dictionary<Exclude<B, P>>;
export function reject<T, C extends readonly T[] | Dictionary<T>>(pred: (value: T) => boolean, collection: C): C;