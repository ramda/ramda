// TODO: Dictionary<T> as a return value is to specific, any seems to loose
export function zipObj<T, K extends string>(keys: readonly K[], values: readonly T[]): { [P in K]: T };
export function zipObj<K extends string>(keys: readonly K[]): <T>(values: readonly T[]) => { [P in K]: T };
export function zipObj<T, K extends number>(keys: readonly K[], values: readonly T[]): { [P in K]: T };
export function zipObj<K extends number>(keys: readonly K[]): <T>(values: readonly T[]) => { [P in K]: T };
