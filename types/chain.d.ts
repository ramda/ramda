export function chain<A, B, T = never>(fn: (n: A) => readonly B[], list: readonly A[]): B[];
export function chain<A, B, T = never>(fn: (n: A) => readonly B[]): (list: readonly A[]) => B[];
export function chain<A, Ma extends { chain: (fn: (a: A) => Mb) => Mb }, Mb>(fn: (a: A) => Mb, monad: Ma): Mb;
export function chain<A, Ma extends { chain: (fn: (a: A) => Mb) => Mb }, Mb>(fn: (a: A) => Mb): (monad: Ma) => Mb;
export function chain<A, B, R>(aToMb: (a: A, r: R) => B, Ma: (r: R) => A): (r: R) => B;
export function chain<A, B, R>(aToMb: (a: A, r: R) => B): (Ma: (r: R) => A) => (r: R) => B;
