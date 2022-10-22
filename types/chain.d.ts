// chain(fn, list)
export function chain<A, B, T = never>(fn: (n: A) => readonly B[], list: readonly A[]): B[];
// chain(fn)(list)
export function chain<A, B, T = never>(fn: (n: A) => readonly B[]): (list: readonly A[]) => B[];

// chain(fn, monad)
export function chain<A, Ma extends { chain: (fn: (a: A) => Mb) => Mb }, Mb>(fn: (a: A) => Mb, monad: Ma): Mb;
// chain(fn)(monad)
export function chain<A, Ma extends { chain: (fn: (a: A) => Mb) => Mb }, Mb>(fn: (a: A) => Mb): (monad: Ma) => Mb;

// chain (f, g)(x)
export function chain<A, B, R>(aToMb: (a: A, r: R) => B, Ma: (r: R) => A): (r: R) => B;
// chain (f)(g)(x)
export function chain<A, B, R>(aToMb: (a: A, r: R) => B): (Ma: (r: R) => A) => (r: R) => B;

// TODO: types for transducer variation
