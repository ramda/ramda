export function juxt<A extends any[], R1>(fns: [(...a: A) => R1]): (...a: A) => [R1];
export function juxt<A extends any[], R1, R2>(fns: [(...a: A) => R1, (...a: A) => R2]): (...a: A) => [R1, R2];
export function juxt<A extends any[], R1, R2, R3>(
    fns: [(...a: A) => R1, (...a: A) => R2, (...a: A) => R3],
): (...a: A) => [R1, R2, R3];
export function juxt<A extends any[], R1, R2, R3, R4>(
    fns: [(...a: A) => R1, (...a: A) => R2, (...a: A) => R3, (...a: A) => R4],
): (...a: A) => [R1, R2, R3, R4];
export function juxt<A extends any[], R1, R2, R3, R4, R5>(
    fns: [(...a: A) => R1, (...a: A) => R2, (...a: A) => R3, (...a: A) => R4, (...a: A) => R5],
): (...a: A) => [R1, R2, R3, R4, R5];
export function juxt<A extends any[], U>(fns: Array<(...args: A) => U>): (...args: A) => U[];