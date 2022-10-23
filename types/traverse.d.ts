export function traverse<A, B>(of: (a: B) => B[], fn: (t: A) => B[], list: readonly A[]): B[][];
export function traverse<A, B>(of: (a: B) => B[], fn: (t: A) => B[]): (list: readonly A[]) => B[][];
export function traverse<A, B>(of: (a: B) => B[]): (fn: (t: A) => B[], list: readonly A[]) => B[][];
