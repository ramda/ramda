export function clamp<T>(min: T, max: T, value: T): T;
export function clamp<T>(min: T, max: T): (value: T) => T;
export function clamp<T>(min: T): (max: T, value: T) => T;
export function clamp<T>(min: T): (max: T) => (value: T) => T;
