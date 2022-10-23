export function propEq<K extends string | number>(name: K, val: any, obj: Record<K, any>): boolean;
export function propEq<K extends string | number>(name: K, val: any): (obj: Record<K, any>) => boolean;
export function propEq<K extends string | number>(
  name: K,
): {
  (val: any, obj: Record<K, any>): boolean;
  (val: any): (obj: Record<K, any>) => boolean;
};
