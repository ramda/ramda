import { Placeholder, Tuple } from './util/tools';

export function aperture<N extends number, T>(n: N, list: readonly T[]): Array<Tuple<T, N>> | [];
export function aperture<T>(__: Placeholder, list: readonly T[]): <N extends number>(n: N) => Array<Tuple<T, N>> | [];
export function aperture<N extends number>(n: N): <T>(list: readonly T[]) => Array<Tuple<T, N>> | [];
