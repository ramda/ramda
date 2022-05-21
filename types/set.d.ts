import { Lens } from './util/tools';

export function set<S, A>(lens: Lens<S, A>, a: A, obj: S): S;
export function set<S, A>(lens: Lens<S, A>, a: A): (obj: S) => S;
export function set<S, A>(lens: Lens<S, A>): (a: A, obj: S) => S;