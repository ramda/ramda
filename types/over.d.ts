import { Lens } from './util/tools';

export function over<S, A>(lens: Lens<S, A>, fn: (a: A) => A, value: S): S;
export function over<S, A>(lens: Lens<S, A>, fn: (a: A) => A): (value: S) => S;
export function over<S, A>(lens: Lens<S, A>): (fn: (a: A) => A, value: S) => S;