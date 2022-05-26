export function mergeDeepWithKey<T1, T2>(fn: (k: string, x: any, z: any) => any, a: T1, b: T2): any;
export function mergeDeepWithKey<T1, T2>(fn: (k: string, x: any, z: any) => any, a: T1): (b: T2) => any;
export function mergeDeepWithKey<T1, T2>(fn: (k: string, x: any, z: any) => any): (a: T1, b: T2) => any;