export function applySpec<Obj extends Record<string, (...args: readonly any[]) => any>>(
    obj: Obj,
): (...args: Parameters<Obj[keyof Obj]>) => { [Key in keyof Obj]: ReturnType<Obj[Key]> };
export function applySpec<T>(obj: any): (...args: readonly any[]) => T;