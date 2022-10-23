export function andThen<A, B>(onSuccess: (a: A) => B | Promise<B>, promise: Promise<A>): Promise<B>;
export function andThen<A, B>(onSuccess: (a: A) => B | Promise<B>): (promise: Promise<A>) => Promise<B>;
