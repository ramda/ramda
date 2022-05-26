export function pick<T, K extends string | number | symbol>(
    names: readonly K[],
    obj: T,
): Pick<T, Exclude<keyof T, Exclude<keyof T, K>>>;
export function pick<K extends string | number | symbol>(
    names: readonly K[],
): <T>(obj: T) => Pick<T, Exclude<keyof T, Exclude<keyof T, K>>>;