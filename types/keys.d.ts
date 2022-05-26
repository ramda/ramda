export function keys<T extends object>(x: T): Array<keyof T>;
export function keys<T>(x: T): string[];