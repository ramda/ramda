export function zipWith<T, U, TResult>(
    fn: (x: T, y: U) => TResult,
    list1: readonly T[],
    list2: readonly U[],
): TResult[];
export function zipWith<T, U, TResult>(
    fn: (x: T, y: U) => TResult,
    list1: readonly T[],
): (list2: readonly U[]) => TResult[];
export function zipWith<T, U, TResult>(
    fn: (x: T, y: U) => TResult,
): (list1: readonly T[], list2: readonly U[]) => TResult[];