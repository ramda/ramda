export function transduce<T, U, V>(
  xf: (arg: readonly T[]) => U[],
  fn: (acc: V, val: U) => V,
  acc: V,
  list: readonly T[],
): V;
export function transduce<T, U, V>(
  xf: (arg: readonly T[]) => U[],
): (fn: (acc: V, val: U) => V, acc: V, list: readonly T[]) => V;
export function transduce<T, U, V>(
  xf: (arg: readonly T[]) => U[],
  fn: (acc: V, val: U) => V,
): (acc: readonly T[], list: readonly T[]) => V;
export function transduce<T, U, V>(
  xf: (arg: readonly T[]) => U[],
  fn: (acc: V, val: U) => V,
  acc: readonly T[],
): (list: readonly T[]) => V;
