import { KeyValuePair } from './util/tools';

export function xprod<K, V>(as: readonly K[], bs: readonly V[]): Array<KeyValuePair<K, V>>;
export function xprod<K>(as: readonly K[]): <V>(bs: readonly V[]) => Array<KeyValuePair<K, V>>;
