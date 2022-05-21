export function pipeK<V0, T1>(fn0: (x0: V0) => T1[]): (x0: V0) => T1[];
export function pipeK<V0, T1, T2>(fn0: (x0: V0) => T1[], fn1: (x: T1) => T2[]): (x0: V0) => T2[];
export function pipeK<V0, T1, T2, T3>(
    fn0: (x: V0) => T1[],
    fn1: (x: T1) => T2[],
    fn2: (x: T2) => T3[],
): (x: V0) => T3[];
export function pipeK<V0, T1, T2, T3, T4>(
    fn0: (x: V0) => T1[],
    fn1: (x: T1) => T2[],
    fn2: (x: T2) => T3[],
    fn3: (x: T3) => T4[],
): (x: V0) => T4[];
export function pipeK<V0, T1, T2, T3, T4, T5>(
    fn0: (x: V0) => T1[],
    fn1: (x: T1) => T2[],
    fn2: (x: T2) => T3[],
    fn3: (x: T3) => T4[],
    fn4: (x: T4) => T5[],
): (x: V0) => T5[];
export function pipeK<V0, T1, T2, T3, T4, T5, T6>(
    fn0: (x: V0) => T1[],
    fn1: (x: T1) => T2[],
    fn2: (x: T2) => T3[],
    fn3: (x: T3) => T4[],
    fn4: (x: T4) => T5[],
    fn5: (x: T5) => T6[],
): (x: V0) => T6[];
export function pipeK<V0, T1, T2, T3, T4, T5, T6, T7>(
    fn0: (x: V0) => T1[],
    fn1: (x: T1) => T2[],
    fn2: (x: T2) => T3[],
    fn3: (x: T3) => T4[],
    fn4: (x: T4) => T5[],
    fn5: (x: T5) => T6[],
    fn: (x: T6) => T7[],
): (x: V0) => T7[];
export function pipeK<V0, T1, T2, T3, T4, T5, T6, T7, T8>(
    fn0: (x: V0) => T1[],
    fn1: (x: T1) => T2[],
    fn2: (x: T2) => T3[],
    fn3: (x: T3) => T4[],
    fn4: (x: T4) => T5[],
    fn5: (x: T5) => T6[],
    fn6: (x: T6) => T7[],
    fn: (x: T7) => T8[],
): (x: V0) => T8[];
export function pipeK<V0, T1, T2, T3, T4, T5, T6, T7, T8, T9>(
    fn0: (x0: V0) => T1[],
    fn1: (x: T1) => T2[],
    fn2: (x: T2) => T3[],
    fn3: (x: T3) => T4[],
    fn4: (x: T4) => T5[],
    fn5: (x: T5) => T6[],
    fn6: (x: T6) => T7[],
    fn7: (x: T7) => T8[],
    fn8: (x: T8) => T9[],
): (x0: V0) => T9[];
export function pipeK<V0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
    fn0: (x0: V0) => T1[],
    fn1: (x: T1) => T2[],
    fn2: (x: T2) => T3[],
    fn3: (x: T3) => T4[],
    fn4: (x: T4) => T5[],
    fn5: (x: T5) => T6[],
    fn6: (x: T6) => T7[],
    fn7: (x: T7) => T8[],
    fn8: (x: T8) => T9[],
    fn9: (x: T9) => T10[],
): (x0: V0) => T10[];