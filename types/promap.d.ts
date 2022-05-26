export function promap<A, B, C, D>(pre: (value: A) => B, post: (value: C) => D, fn: (value: B) => C): (value: A) => D;
export function promap<A, B, C, D>(pre: (value: A) => B, post: (value: C) => D): (fn: (value: B) => C) => (value: A) => D;
export function promap<A, B>(pre: (value: A) => B): <C, D>(post: (value: C) => D, fn: (value: B) => C) => (value: A) => D;