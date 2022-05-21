export function differenceWith<T1, T2>(
    pred: (a: T1, b: T2) => boolean,
    list1: readonly T1[],
    list2: readonly T2[],
): T1[];
export function differenceWith<T1, T2>(
    pred: (a: T1, b: T2) => boolean,
): (list1: readonly T1[], list2: readonly T2[]) => T1[];
export function differenceWith<T1, T2>(
    pred: (a: T1, b: T2) => boolean,
    list1: readonly T1[],
): (list2: readonly T2[]) => T1[];