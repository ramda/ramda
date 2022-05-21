export function composeK<V0, T1>(fn0: (x0: V0) => T1[]): (x0: V0) => T1[];
export function composeK<V0, T1, T2>(fn1: (x: T1) => T2[], fn0: (x0: V0) => T1[]): (x0: V0) => T2[];
export function composeK<V0, T1, T2, T3>(
    fn2: (x: T2) => T3[],
    fn1: (x: T1) => T2[],
    fn0: (x: V0) => T1[],
): (x: V0) => T3[];
export function composeK<V0, T1, T2, T3, T4>(
    fn3: (x: T3) => T4[],
    fn2: (x: T2) => T3[],
    fn1: (x: T1) => T2[],
    fn0: (x: V0) => T1[],
): (x: V0) => T4[];
export function composeK<V0, T1, T2, T3, T4, T5>(
    fn4: (x: T4) => T5[],
    fn3: (x: T3) => T4[],
    fn2: (x: T2) => T3[],
    fn1: (x: T1) => T2[],
    fn0: (x: V0) => T1[],
): (x: V0) => T5[];
export function composeK<V0, T1, T2, T3, T4, T5, T6>(
    fn5: (x: T5) => T6[],
    fn4: (x: T4) => T5[],
    fn3: (x: T3) => T4[],
    fn2: (x: T2) => T3[],
    fn1: (x: T1) => T2[],
    fn0: (x: V0) => T1[],
): (x: V0) => T6[];