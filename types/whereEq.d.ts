export function whereEq<T, U>(spec: T, obj: U): boolean;
export function whereEq<T>(spec: T): <U>(obj: U) => boolean;
