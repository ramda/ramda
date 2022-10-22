import { Path, Placeholder } from './util/tools';

export function path<S, K0 extends keyof S>(path: [K0]): (obj: S) => S[K0];
export function path<K0 extends string>(path: [K0]): <S extends Record<K0, any>>(obj: S) => S[K0];
export function path<S, K0 extends keyof S>(path: [K0], obj: S): S[K0];

export function path<S, K0 extends keyof S, K1 extends keyof S[K0]>(path: [K0, K1], obj: S) : S[K0][K1];
export function path<K0 extends string, K1 extends string>(path: [K0, K1]): <S extends Record<K0, Record<K1, any>>>(obj: S) => S[K0][K1];
export function path<S, K0 extends keyof S, K1 extends keyof S[K0]>(path: [K0, K1]): (obj: S) => S[K0][K1];

export function path<
  S,
  K0 extends keyof S,
  K1 extends keyof S[K0],
  K2 extends keyof S[K0][K1]
>(path: [K0, K1, K2], obj: S): S[K0][K1][K2];
export function path<
  K0 extends string,
  K1 extends string,
  K2 extends string
>(path: [K0, K1, K2]): <
  S extends Record<K0, Record<K1, Record<K2, any>>>
>(obj: S) => S[K0][K1][K2];
export function path<
  S,
  K0 extends keyof S,
  K1 extends keyof S[K0],
  K2 extends keyof S[K0][K1]
>(path: [K0, K1, K2]): (obj: S) => S[K0][K1][K2];

export function path<
  S,
  K0 extends keyof S,
  K1 extends keyof S[K0],
  K2 extends keyof S[K0][K1],
  K3 extends keyof S[K0][K1][K2]
>(path: [K0, K1, K2, K3], obj: S) : S[K0][K1][K2][K3];
export function path<
  K0 extends string,
  K1 extends string,
  K2 extends string,
  K3 extends string
>(path: [K0, K1, K2, K3]): <
  S extends Record<K0, Record<K1, Record<K2, Record<K3, any>>>>
>(obj: S) => S[K0][K1][K2][K3];
export function path<
  S,
  K0 extends keyof S,
  K1 extends keyof S[K0],
  K2 extends keyof S[K0][K1],
  K3 extends keyof S[K0][K1][K2]
>(path: [K0, K1, K2, K3]): (obj: S) => S[K0][K1][K2][K3];

export function path<
  S,
  K0 extends keyof S,
  K1 extends keyof S[K0],
  K2 extends keyof S[K0][K1],
  K3 extends keyof S[K0][K1][K2],
  K4 extends keyof S[K0][K1][K2][K3]
>(path: [K0, K1, K2, K3, K4], obj: S) : S[K0][K1][K2][K3][K4];
export function path<
  K0 extends string,
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K4 extends string
>(path: [K0, K1, K2, K3, K4]): <
  S extends Record<K0, Record<K1, Record<K2, Record<K3, Record<K4, any>>>>>
>(obj: S) => S[K0][K1][K2][K3][K4];
export function path<
  S,
  K0 extends keyof S,
  K1 extends keyof S[K0],
  K2 extends keyof S[K0][K1],
  K3 extends keyof S[K0][K1][K2],
  K4 extends keyof S[K0][K1][K2][K3]
>(path: [K0, K1, K2, K3, K4]): (obj: S) => S[K0][K1][K2][K3][K4];

export function path<
  S,
  K0 extends keyof S,
  K1 extends keyof S[K0],
  K2 extends keyof S[K0][K1],
  K3 extends keyof S[K0][K1][K2],
  K4 extends keyof S[K0][K1][K2][K3],
  K5 extends keyof S[K0][K1][K2][K3][K4]
>(path: [K0, K1, K2, K3, K4, K5], obj: S) : S[K0][K1][K2][K3][K4][K5];
export function path<
  K0 extends string,
  K1 extends string,
  K2 extends string,
  K3 extends string,
  K4 extends string,
  K5 extends string
>(path: [K0, K1, K2, K3, K4, K5]): <
  S extends Record<K0, Record<K1, Record<K2, Record<K3, Record<K4, Record<K5, any>>>>>>
>(obj: S) => S[K0][K1][K2][K3][K4][K5];
export function path<
  S,
  K0 extends keyof S,
  K1 extends keyof S[K0],
  K2 extends keyof S[K0][K1],
  K3 extends keyof S[K0][K1][K2],
  K4 extends keyof S[K0][K1][K2][K3],
  K5 extends keyof S[K0][K1][K2][K3][K4]
>(path: [K0, K1, K2, K3, K4, K5]): (obj: S) => S[K0][K1][K2][K3][K4][K5];

export function path<S>(__: Placeholder, obj: S): {
  <K0 extends keyof S>(path: [K0]): S[K0];
  <K0 extends keyof S, K1 extends keyof S[K0]>(path: [K0, K1]): S[K0][K1];
  <K0 extends keyof S, K1 extends keyof S[K0], K2 extends keyof S[K0][K1]>(path: [K0, K1, K2]): S[K0][K1][K2];
  <K0 extends keyof S,K1 extends keyof S[K0],K2 extends keyof S[K0][K1],K3 extends keyof S[K0][K1][K2]>(path: [K0, K1, K2, K3]): S[K0][K1][K2][K3];
  <
    K0 extends keyof S,
    K1 extends keyof S[K0],
    K2 extends keyof S[K0][K1],
    K3 extends keyof S[K0][K1][K2],
    K4 extends keyof S[K0][K1][K2][K3]
  >(path: [K0, K1, K2, K3, K4]): S[K0][K1][K2][K3][K4];
  <
    K0 extends keyof S,
    K1 extends keyof S[K0],
    K2 extends keyof S[K0][K1],
    K3 extends keyof S[K0][K1][K2],
    K4 extends keyof S[K0][K1][K2][K3],
    K5 extends keyof S[K0][K1][K2][K3][K4]
  >(path: [K0, K1, K2, K3, K4, K5]): S[K0][K1][K2][K3][K4][K5];
}

export function path<T>(path: Path, obj: any): T | undefined;
export function path<T>(path: Path): (obj: any) => T | undefined;
