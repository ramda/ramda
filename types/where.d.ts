export function where<T, U>(spec: T, testObj: U): boolean;
export function where<T>(spec: T): <U>(testObj: U) => boolean;
export function where<ObjFunc2, U>(spec: ObjFunc2, testObj: U): boolean;
export function where<ObjFunc2>(spec: ObjFunc2): <U>(testObj: U) => boolean;
