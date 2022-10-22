import { Placeholder } from './util/tools';

export function and<B>(__: Placeholder, b: B): <A>(a: A) => A | B;
export function and<A, B>(a: A, b: B): A | B;
export function and<A>(a: A): <B>(b: B) => A | B;
