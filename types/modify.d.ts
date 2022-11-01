export function modify<
  K extends string | number,
  F extends (...args: any) => (...args: any) => object
>(key: K): F;
export function modify<
  K extends string | number,
  F extends (...args: any) => any,
  O extends object
>(key: K, func: F): (...args: any) => O;
export function modify<
  K extends string | number,
  F extends (...args: any) => any,
  O extends object
>(key: K, func: F, obj: O): O;
