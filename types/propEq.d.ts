export function propEq<K extends string | number>(val: any, name: K, obj: Record<K, any>): boolean;
export function propEq<K extends string | number>(val: any, name: K): (obj: Record<K, any>) => boolean;
export function propEq<K extends string | number>(
    val: any,
): {
    (name: K, obj: Record<K, any>): boolean;
    (name: K): (obj: Record<K, any>) => boolean;
};
