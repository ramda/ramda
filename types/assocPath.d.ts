import * as _ from 'ts-toolbelt';
import { Placeholder, Path } from './util/tools';

// assocPath(__, val, obj)
export function assocPath<S extends object, T>(__: Placeholder, val: T, obj: S): {
  // assocPath(__, val, obj)(path) path length = 1
  <K0 extends keyof S>(path: [K0]): S[K0] extends T ? S : _.O.P.Update<S, [K0], T>;
  <K0 extends string>(path: [K0]): _.O.P.Update<S, [K0], T>;
  // assocPath(__, val, obj)(path) path length = 2
  <K0 extends keyof S, K1 extends keyof S[K0]>(path: [K0, K1]):
    S[K0][K1] extends T ? S : _.O.P.Update<S, [K0, K1], T>;
  <K0 extends string, K1 extends string>(path: [K0, K1]):
    _.O.P.Update<S, [K0, K1], T>;
  // assocPath(__, val, obj)(path) path length = 3
  <K0 extends keyof S, K1 extends keyof S[K0], K2 extends keyof S[K0][K1]>(path: [K0, K1, K2]):
    S[K0][K1][K2] extends T ? S : _.O.P.Update<S, [K0, K1, K2], T>;
  <K0 extends string, K1 extends string, K2 extends string>(path: [K0, K1, K2]):
    _.O.P.Update<S, [K0, K1, K2], T>;
  // assocPath(__, val, obj)(path) path length = 4
  <
    K0 extends keyof S,
    K1 extends keyof S[K0],
    K2 extends keyof S[K0][K1],
    K3 extends keyof S[K0][K1][K2]
  >(path: [K0, K1, K2, K3]):
    S[K0][K1][K2][K3] extends T ? S : _.O.P.Update<S, [K0, K1, K2, K3], T>;
  <
    K0 extends string,
    K1 extends string,
    K2 extends string,
    K3 extends string
  >(path: [K0, K1, K2, K3]):
    _.O.P.Update<S, [K0, K1, K2, K3], T>;
  // assocPath(__, val, obj)(path) path length = 5
  <
    K0 extends keyof S,
    K1 extends keyof S[K0],
    K2 extends keyof S[K0][K1],
    K3 extends keyof S[K0][K1][K2],
    K4 extends keyof S[K0][K1][K2][K3]
  >(path: [K0, K1, K2, K3, K4]):
    S[K0][K1][K2][K3][K4] extends T ? S : _.O.P.Update<S, [K0, K1, K2, K3, K4], T>;
  <
    K0 extends string,
    K1 extends string,
    K2 extends string,
    K3 extends string,
    K4 extends string
  >(path: [K0, K1, K2, K3, K4]):
    _.O.P.Update<S, [K0, K1, K2, K3, K4], T>;
  // assocPath(__, val, obj)(path) path length = 6
  <
    K0 extends keyof S,
    K1 extends keyof S[K0],
    K2 extends keyof S[K0][K1],
    K3 extends keyof S[K0][K1][K2],
    K4 extends keyof S[K0][K1][K2][K3],
    K5 extends keyof S[K0][K1][K2][K3][K4]
  >(path: [K0, K1, K2, K3, K4, K5]):
    S[K0][K1][K2][K3][K4][K5] extends T ? S : _.O.P.Update<S, [K0, K1, K2, K3, K4, K5], T>;
  <
    K0 extends string,
    K1 extends string,
    K2 extends string,
    K3 extends string,
    K4 extends string,
    K5 extends string
  >(path: [K0, K1, K2, K3, K4, K5]):
    _.O.P.Update<S, [K0, K1, K2, K3, K4, K5], T>;
  // assocPath(__, val, obj)(path) path length > 6
  <T>(path: Path): T | undefined;
}

// assocPath(path, __, obj)(val) - path length = 1, path known
export function assocPath<S extends object, K0 extends keyof S>(path: [K0], __: Placeholder, obj: S): <T>(val: T) =>
  T extends S[K0] ? S : _.O.P.Update<S, [K0], T>;
// assocPath(path, __, obj)(val) - path length = 1, path unknown
export function assocPath<S extends object, K0 extends string>(path: [K0], __: Placeholder, obj: S): <T>(val: T) =>
  _.O.P.Update<S, [K0], T>;
// assocPath(path, __, obj)(val) - path length = 2, path known
export function assocPath<S extends object, K0 extends keyof S, K1 extends keyof S[K0]>(path: [K0, K1], __: Placeholder, obj: S): <T>(val: T) =>
  S[K0][K1] extends T ? S : _.O.P.Update<S, [K0, K1], T>;
// assocPath(path, __, obj)(val) - path length = 2, path unknown
export function assocPath<S extends object, K0 extends string, K1 extends string>(path: [K0, K1], __: Placeholder, obj: S): <T>(val: T) =>
  _.O.P.Update<S, [K0, K1], T>;
// assocPath(path, __, obj)(val) - path length = 3, path known
export function assocPath<
  S extends object,
  K0 extends keyof S,
  K1 extends keyof S[K0],
  K2 extends keyof S[K0][K1]
>(path: [K0, K1, K2], __: Placeholder, obj: S): <T>(val: T) =>
  S[K0][K1][K2] extends T ? S : _.O.P.Update<S, [K0, K1, K2], T>;
// assocPath(path, __, obj)(val) - path length = 3, path unknown
export function assocPath<
  S extends object,
  K0 extends string,
  K1 extends string,
  K2 extends string
>(path: [K0, K1, K2], __: Placeholder, obj: S): <T>(val: T) =>
  _.O.P.Update<S, [K0, K1, K2], T>;
  // assocPath(path, __, obj)(val) - path length = 4, path known
export function assocPath<
  S extends object,
  K0 extends keyof S,
  K1 extends keyof S[K0],
  K2 extends keyof S[K0][K1],
  K3 extends keyof S[K0][K1][K2]
>(path: [K0, K1, K2, K3], __: Placeholder, obj: S): <T>(val: T) =>
  S[K0][K1][K2][K3] extends T ? S : _.O.P.Update<S, [K0, K1, K2, K3], T>;
// assocPath(path, __, obj)(val) - path length = 4, path unknown
export function assocPath<
  S extends object,
  K0 extends string,
  K1 extends string,
  K2 extends string,
  K3 extends string
>(path: [K0, K1, K2, K3], __: Placeholder, obj: S): <T>(val: T) =>
  _.O.P.Update<S, [K0, K1, K2, K3], T>;
  // assocPath(path, __, obj)(val) - path length = 5, path known
export function assocPath<
  S extends object,
  K0 extends keyof S,
  K1 extends keyof S[K0],
  K2 extends keyof S[K0][K1],
  K3 extends keyof S[K0][K1][K2],
  K4 extends keyof S[K0][K1][K2][K3]
>(path: [K0, K1, K2, K3, K4], __: Placeholder, obj: S): <T>(val: T) =>
  S[K0][K1][K2][K3][K4] extends T ? S : _.O.P.Update<S, [K0, K1, K2, K3, K4], T>;
// assocPath(path, __, obj)(val) - path length = 5, path unknown
export function assocPath<
  S extends object,
  K0 extends string,
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K4 extends string
>(path: [K0, K1, K2, K3, K4], __: Placeholder, obj: S): <T>(val: T) =>
  _.O.P.Update<S, [K0, K1, K2, K3, K4], T>;
// assocPath(path, __, obj)(val) - path length = 6, path known
export function assocPath<
  S extends object,
  K0 extends keyof S,
  K1 extends keyof S[K0],
  K2 extends keyof S[K0][K1],
  K3 extends keyof S[K0][K1][K2],
  K4 extends keyof S[K0][K1][K2][K3],
  K5 extends keyof S[K0][K1][K2][K3]
>(path: [K0, K1, K2, K3, K4, K5], __: Placeholder, obj: S): <T>(val: T) =>
  S[K0][K1][K2][K3][K4] extends T ? S : _.O.P.Update<S, [K0, K1, K2, K3, K4], T>;
// assocPath(path, __, obj)(val) - path length = 6, path unknown
export function assocPath<
  S extends object,
  K0 extends string,
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string
>(path: [K0, K1, K2, K3, K4, K5], __: Placeholder, obj: S): <T>(val: T) =>
  _.O.P.Update<S, [K0, K1, K2, K3, K4, K5], T>;
// assocPath(path, __, obj)(val) - path length > 6
export function assocPath<S extends object, P extends Path>(path: P, __: Placeholder, obj: S):
  <T>(val: T) => _.O.P.Update<S, P, T>;

// TODO: assocPath(__, __, obj)

// assocPath(path, val, obj) - path length = 1, path known
export function assocPath<S extends object, K0 extends keyof S, T>(path: [K0], val: T, obj: S):
  T extends S[K0] ? S : _.O.P.Update<S, [K0], T>;
// assocPath(path, val, obj) - path length = 1, path unknown
export function assocPath<S extends object, K0 extends string, T>(path: [K0], val: T, obj: S):
  _.O.P.Update<S, [K0], T>;
// assocPath(path, val, obj) - path length = 2, path known
export function assocPath<S extends object, K0 extends keyof S, K1 extends keyof S[K0], T>(path: [K0, K1], val: T, obj: S):
  S[K0][K1] extends T ? S : _.O.P.Update<S, [K0, K1], T>;
// assocPath(path, val, obj) - path length = 2, path unknown
export function assocPath<S extends object, K0 extends string, K1 extends string, T>(path: [K0, K1], val: T, obj: S):
  _.O.P.Update<S, [K0, K1], T>;
// assocPath(path, val, obj) - path length = 3, path known
export function assocPath<
  S extends object,
  K0 extends keyof S,
  K1 extends keyof S[K0],
  K2 extends keyof S[K0][K1],
  T
>(path: [K0, K1, K2], val: T, obj: S):
  S[K0][K1][K2] extends T ? S : _.O.P.Update<S, [K0, K1, K2], T>;
// assocPath(path, val, obj) - path length = 3, path unknown
export function assocPath<
  S extends object,
  K0 extends string,
  K1 extends string,
  K2 extends string,
  T
>(path: [K0, K1, K2], val: T, obj: S):
  _.O.P.Update<S, [K0, K1, K2], T>;
  // assocPath(path, val, obj) - path length = 4, path known
export function assocPath<
  S extends object,
  K0 extends keyof S,
  K1 extends keyof S[K0],
  K2 extends keyof S[K0][K1],
  K3 extends keyof S[K0][K1][K2],
  T
>(path: [K0, K1, K2, K3], val: T, obj: S):
  S[K0][K1][K2][K3] extends T ? S : _.O.P.Update<S, [K0, K1, K2, K3], T>;
// assocPath(path, val, obj) - path length = 4, path unknown
export function assocPath<
  S extends object,
  K0 extends string,
  K1 extends string,
  K2 extends string,
  K3 extends string,
  T
>(path: [K0, K1, K2, K3], val: T, obj: S):
  _.O.P.Update<S, [K0, K1, K2, K3], T>;
  // assocPath(path, val, obj) - path length = 5, path known
export function assocPath<
  S extends object,
  K0 extends keyof S,
  K1 extends keyof S[K0],
  K2 extends keyof S[K0][K1],
  K3 extends keyof S[K0][K1][K2],
  K4 extends keyof S[K0][K1][K2][K3],
  T
>(path: [K0, K1, K2, K3, K4], val: T, obj: S):
  S[K0][K1][K2][K3][K4] extends T ? S : _.O.P.Update<S, [K0, K1, K2, K3, K4], T>;
// assocPath(path, val, obj) - path length = 5, path unknown
export function assocPath<
  S extends object,
  K0 extends string,
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  T
>(path: [K0, K1, K2, K3, K4], val: T, obj: S):
  _.O.P.Update<S, [K0, K1, K2, K3, K4], T>;
// assocPath(path, val, obj) - path length = 6, path known
export function assocPath<
  S extends object,
  K0 extends keyof S,
  K1 extends keyof S[K0],
  K2 extends keyof S[K0][K1],
  K3 extends keyof S[K0][K1][K2],
  K4 extends keyof S[K0][K1][K2][K3],
  K5 extends keyof S[K0][K1][K2][K3],
  T
>(path: [K0, K1, K2, K3, K4, K5], val: T, obj: S):
  S[K0][K1][K2][K3][K4] extends T ? S : _.O.P.Update<S, [K0, K1, K2, K3, K4], T>;
// assocPath(path, val, obj) - path length = 6, path unknown
export function assocPath<
  S extends object,
  K0 extends string,
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string,
  T
>(path: [K0, K1, K2, K3, K4, K5], val: T, obj: S): _.O.P.Update<S, [K0, K1, K2, K3, K4, K5], T>;
// assocPath(path, val, obj) -  path length > 6
export function assocPath<S extends object, P extends Path, T>(path: P, val: T, obj: S):
  <T>(val: T) => _.O.P.Update<S, P, T>;
