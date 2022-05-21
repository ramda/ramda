export function composeP<V0, T1>(fn0: (x0: V0) => Promise<T1>): (x0: V0) => Promise<T1>;
export function composeP<V0, T1, T2>(
    fn1: (x: T1) => Promise<T2>,
    fn0: (x0: V0) => Promise<T1>,
): (x0: V0) => Promise<T2>;
export function composeP<V0, T1, T2, T3>(
    fn2: (x: T2) => Promise<T3>,
    fn1: (x: T1) => Promise<T2>,
    fn0: (x: V0) => Promise<T1>,
): (x: V0) => Promise<T3>;
export function composeP<V0, T1, T2, T3, T4>(
    fn3: (x: T3) => Promise<T4>,
    fn2: (x: T2) => Promise<T3>,
    fn1: (x: T1) => Promise<T2>,
    fn0: (x: V0) => Promise<T1>,
): (x: V0) => Promise<T4>;
export function composeP<V0, T1, T2, T3, T4, T5>(
    fn4: (x: T4) => Promise<T5>,
    fn3: (x: T3) => Promise<T4>,
    fn2: (x: T2) => Promise<T3>,
    fn1: (x: T1) => Promise<T2>,
    fn0: (x: V0) => Promise<T1>,
): (x: V0) => Promise<T5>;
export function composeP<V0, T1, T2, T3, T4, T5, T6>(
    fn5: (x: T5) => Promise<T6>,
    fn4: (x: T4) => Promise<T5>,
    fn3: (x: T3) => Promise<T4>,
    fn2: (x: T2) => Promise<T3>,
    fn1: (x: T1) => Promise<T2>,
    fn0: (x: V0) => Promise<T1>,
): (x: V0) => Promise<T6>;