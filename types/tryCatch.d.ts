import * as _ from 'ts-toolbelt';

export function tryCatch<F extends (...args: readonly any[]) => any, RE = ReturnType<F>, E = unknown>(
  tryer: F,
  catcher: (error: E, ...args: _.F.Parameters<F>) => RE,
): F | (() => RE);
export function tryCatch<F extends (...args: readonly any[]) => any>(
  tryer: F,
): <RE = ReturnType<F>, E = unknown>(catcher: (error: E, ...args: _.F.Parameters<F>) => RE) => F | (() => RE);
