export function bind<F extends (...args: readonly any[]) => any, T>(
  fn: F,
  thisObj: T,
): (...args: Parameters<F>) => ReturnType<F>;
export function bind<F extends (...args: readonly any[]) => any, T>(
  fn: F,
): (thisObj: T) => (...args: Parameters<F>) => ReturnType<F>;
