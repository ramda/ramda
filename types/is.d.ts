export function is<C extends (...args: any[]) => any>(ctor: C, val: any): val is ReturnType<C>;
export function is<C extends new (...args: any[]) => any>(ctor: C, val: any): val is InstanceType<C>;
export function is<C extends (...args: any[]) => any>(ctor: C): (val: any) => val is ReturnType<C>;
export function is<C extends new (...args: any[]) => any>(ctor: C): (val: any) => val is InstanceType<C>;