import { Tuple } from './util/tools';

export function aperture<N extends number, T>(n: N, list: readonly T[]): Array<Tuple<T, N>> | [];
export function aperture<N extends number>(n: N): <T>(list: readonly T[]) => Array<Tuple<T, N>> | [];
