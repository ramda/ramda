export function eqBy<T>(fn: (a: T) => unknown, a: T, b: T): boolean;
export function eqBy<T>(fn: (a: T) => unknown, a: T): (b: T) => boolean;
export function eqBy<T>(fn: (a: T) => unknown): {
  (a: T, b: T): boolean;
  (a: T): (b: T) => boolean;
};
