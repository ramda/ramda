export function pipeP<V0, T1>(fn0: (x0: V0) => Promise<T1>): (x0: V0) => Promise<T1>;
export function pipeP<V0, T1, T2>(fn0: (x0: V0) => Promise<T1>, fn1: (x: T1) => Promise<T2>): (x0: V0) => Promise<T2>;
export function pipeP<V0, T1, T2, T3>(
    fn0: (x: V0) => Promise<T1>,
    fn1: (x: T1) => Promise<T2>,
    fn2: (x: T2) => Promise<T3>,
): (x: V0) => Promise<T3>;
export function pipeP<V0, T1, T2, T3, T4>(
    fn0: (x: V0) => Promise<T1>,
    fn1: (x: T1) => Promise<T2>,
    fn2: (x: T2) => Promise<T3>,
    fn3: (x: T3) => Promise<T4>,
): (x: V0) => Promise<T4>;
export function pipeP<V0, T1, T2, T3, T4, T5>(
    fn0: (x: V0) => Promise<T1>,
    fn1: (x: T1) => Promise<T2>,
    fn2: (x: T2) => Promise<T3>,
    fn3: (x: T3) => Promise<T4>,
    fn4: (x: T4) => Promise<T5>,
): (x: V0) => Promise<T5>;
export function pipeP<V0, T1, T2, T3, T4, T5, T6>(
    fn0: (x: V0) => Promise<T1>,
    fn1: (x: T1) => Promise<T2>,
    fn2: (x: T2) => Promise<T3>,
    fn3: (x: T3) => Promise<T4>,
    fn4: (x: T4) => Promise<T5>,
    fn5: (x: T5) => Promise<T6>,
): (x: V0) => Promise<T6>;
export function pipeP<V0, T1, T2, T3, T4, T5, T6, T7>(
    fn0: (x: V0) => Promise<T1>,
    fn1: (x: T1) => Promise<T2>,
    fn2: (x: T2) => Promise<T3>,
    fn3: (x: T3) => Promise<T4>,
    fn4: (x: T4) => Promise<T5>,
    fn5: (x: T5) => Promise<T6>,
    fn: (x: T6) => Promise<T7>,
): (x: V0) => Promise<T7>;
export function pipeP<V0, T1, T2, T3, T4, T5, T6, T7, T8>(
    fn0: (x: V0) => Promise<T1>,
    fn1: (x: T1) => Promise<T2>,
    fn2: (x: T2) => Promise<T3>,
    fn3: (x: T3) => Promise<T4>,
    fn4: (x: T4) => Promise<T5>,
    fn5: (x: T5) => Promise<T6>,
    fn6: (x: T6) => Promise<T7>,
    fn: (x: T7) => Promise<T8>,
): (x: V0) => Promise<T8>;
export function pipeP<V0, T1, T2, T3, T4, T5, T6, T7, T8, T9>(
    fn0: (x0: V0) => Promise<T1>,
    fn1: (x: T1) => Promise<T2>,
    fn2: (x: T2) => Promise<T3>,
    fn3: (x: T3) => Promise<T4>,
    fn4: (x: T4) => Promise<T5>,
    fn5: (x: T5) => Promise<T6>,
    fn6: (x: T6) => Promise<T7>,
    fn7: (x: T7) => Promise<T8>,
    fn8: (x: T8) => Promise<T9>,
): (x0: V0) => Promise<T9>;
export function pipeP<V0, T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
    fn0: (x0: V0) => Promise<T1>,
    fn1: (x: T1) => Promise<T2>,
    fn2: (x: T2) => Promise<T3>,
    fn3: (x: T3) => Promise<T4>,
    fn4: (x: T4) => Promise<T5>,
    fn5: (x: T5) => Promise<T6>,
    fn6: (x: T6) => Promise<T7>,
    fn7: (x: T7) => Promise<T8>,
    fn8: (x: T8) => Promise<T9>,
    fn9: (x: T9) => Promise<T10>,
): (x0: V0) => Promise<T10>;