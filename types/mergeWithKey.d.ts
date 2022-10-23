export function mergeWithKey<U, V>(fn: (str: string, x: any, z: any) => any, a: U, b: V): any;
export function mergeWithKey<U>(fn: (str: string, x: any, z: any) => any, a: U): <V>(b: V) => any;
export function mergeWithKey(fn: (str: string, x: any, z: any) => any): <U, V>(a: U, b: V) => any;
