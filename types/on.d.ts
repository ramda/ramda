export function on<T, U, R>(combine: (a: U, b: U) => R, transform: (value: T) => U, a: T, b: T): R;
export function on<T, U, R>(combine: (a: U, b: U) => R, transform: (value: T) => U, a: T): (b: T) => R;
export function on<T, U, R>(combine: (a: U, b: U) => R, transform: (value: T) => U): {
    (a: T, b: T): R;
    (a: T): (b: T) => R;
};
export function on<U, R>(combine: (a: U, b: U) => R): {
    <T>(transform: (value: T) => U, a: T, b: T): R;
    <T>(transform: (value: T) => U, a: T): (b: T) => R;
    <T>(transform: (value: T) => U): {
        (a: T, b: T): R;
        (a: T): (b: T) => R;
    };
};
// For manually specifying overloads
export function on<T, U, R>(combine: (a: U, b: U) => R): {
    (transform: (value: T) => U, a: T, b: T): R;
    (transform: (value: T) => U, a: T): (b: T) => R;
    (transform: (value: T) => U): {
        (a: T, b: T): R;
        (a: T): (b: T) => R;
    };
};