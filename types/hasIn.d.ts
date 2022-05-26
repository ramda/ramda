export function hasIn<T>(s: string, obj: T): boolean;
export function hasIn(s: string): <T>(obj: T) => boolean;