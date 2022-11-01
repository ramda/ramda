export function modify<
  K extends string | number,
  O extends object,
  F extends (...args: any) => (obj: O) => O
>(key: K): F;
export function modify<
  K extends string | number,
  F extends (...args: any) => any,
  O extends object
>(key: K, func: F): (obj: O) => O;
export function modify<
  K extends string | number,
  F extends (...args: any) => any,
  O extends object
>(key: K, func: F, obj: O): O;