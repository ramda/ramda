import { Dictionary } from './util/tools';

export function filter<A, P extends A>(
    pred: (val: A) => val is P,
): {
    <B extends A>(list: readonly B[]): P[];
    <B extends A>(dict: Dictionary<B>): Dictionary<P>;
};
export function filter<T>(
    pred: (value: T) => boolean,
): <P extends T, C extends readonly P[] | Dictionary<P>>(collection: C) => C;
export function filter<T, P extends T>(pred: (val: T) => val is P, list: readonly T[]): P[];
export function filter<T, P extends T>(pred: (val: T) => val is P, dict: Dictionary<T>): Dictionary<P>;
export function filter<T, C extends readonly T[] | Dictionary<T>>(pred: (value: T) => boolean, collection: C): C;