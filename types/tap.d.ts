export function tap<T>(fn: (a: T) => void, value: T): T;
export function tap<T>(fn: (a: T) => void): (value: T) => T;
