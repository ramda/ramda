export function mergeWith<U, V>(fn: (x: any, z: any) => any, a: U, b: V): any;
export function mergeWith<U>(fn: (x: any, z: any) => any, a: U): <V>(b: V) => any;
export function mergeWith(fn: (x: any, z: any) => any): <U, V>(a: U, b: V) => any;
