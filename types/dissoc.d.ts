export function dissoc<T extends object, K extends keyof T>(prop: K, obj: T): Omit<T, K>;
export function dissoc<K extends string | number>(prop: K): <T extends object>(obj: T) => Omit<T, K>;