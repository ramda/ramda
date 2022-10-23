export function mapAccum<T, U, TResult>(
  fn: (acc: U, value: T) => [U, TResult],
  acc: U,
  list: readonly T[],
): [U, TResult[]];
export function mapAccum<T, U, TResult>(
  fn: (acc: U, value: T) => [U, TResult],
): (acc: U, list: readonly T[]) => [U, TResult[]];
export function mapAccum<T, U, TResult>(
  fn: (acc: U, value: T) => [U, TResult],
  acc: U,
): (list: readonly T[]) => [U, TResult[]];
