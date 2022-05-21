export function partialRight<V0, V1, T>(fn: (x0: V0, x1: V1) => T, args: [V1]): (x1: V0) => T;
export function partialRight<V0, V1, V2, T>(fn: (x0: V0, x1: V1, x2: V2) => T, args: [V1, V2]): (x2: V0) => T;
export function partialRight<V0, V1, V2, T>(fn: (x0: V0, x1: V1, x2: V2) => T, args: [V2]): (x1: V0, x2: V1) => T;
export function partialRight<V0, V1, V2, V3, T>(
    fn: (x0: V0, x1: V1, x2: V2, x3: V3) => T,
    args: [V1, V2, V3],
): (x0: V0) => T;
export function partialRight<V0, V1, V2, V3, T>(
    fn: (x0: V0, x1: V1, x2: V2, x3: V3) => T,
    args: [V2, V3],
): (x0: V0, x1: V1) => T;
export function partialRight<V0, V1, V2, V3, T>(
    fn: (x0: V0, x1: V1, x2: V2, x3: V3) => T,
    args: [V3],
): (x0: V0, x1: V1, x2: V2) => T;
export function partialRight<T>(fn: (...a: readonly any[]) => T, args: readonly any[]): (...a: readonly any[]) => T;