export function mergeDeepWith<T1, T2>(fn: (x: any, z: any) => any, a: T1, b: T2): any;
export function mergeDeepWith<T1, T2>(fn: (x: any, z: any) => any, a: T1): (b: T2) => any;
export function mergeDeepWith<T1, T2>(fn: (x: any, z: any) => any): (a: T1, b: T2) => any;