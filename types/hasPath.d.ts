export function hasPath<T>(list: readonly string[], obj: T): boolean;
export function hasPath(list: readonly string[]): <T>(obj: T) => boolean;
