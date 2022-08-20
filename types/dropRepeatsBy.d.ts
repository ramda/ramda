export function dropRepeatsBy<T, U>(fn: (a: T) => U, list: readonly T[]): T[];
export function dropRepeatsBy<T, U>(
  fn: (a: T) => U
): (list: readonly T[]) => T[];
export function dropRepeatsBy(fn: any): <T>(list: readonly T[]) => T[];
