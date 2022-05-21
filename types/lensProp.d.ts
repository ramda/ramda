import { Lens } from './util/tools';

export function lensProp<S, K extends keyof S = keyof S>(prop: K): Lens<S, S[K]>;