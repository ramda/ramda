import { Placeholder } from './util/tools';

export function andThen<A, B>(onSuccess: (a: A) => B | Promise<B>, promise: Promise<A>): Promise<B>;
export function andThen<A>(__: Placeholder, promise: Promise<A>): <B>(onSuccess: (a: A) => B | Promise<B>) => Promise<B>;
export function andThen<A, B>(onSuccess: (a: A) => B | Promise<B>): (promise: Promise<A>) => Promise<B>;
