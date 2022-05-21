export function o<T1, T2, R>(f: (x: T2) => R, g: (x: T1) => T2, v: T1): R;
export function o<T1, T2, R>(f: (x: T2) => R, g: (x: T1) => T2): (v: T1) => R;
export function o<T2, R>(
    f: (x: T2) => R,
): {
    <T1>(g: (x: T1) => T2, v: T1): R;
    <T1>(g: (x: T1) => T2): (v: T1) => R;
};