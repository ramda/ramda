import { KeyValuePair } from './util/tools';

export function zip<K, V>(list1: readonly K[], list2: readonly V[]): Array<KeyValuePair<K, V>>;
export function zip<K>(list1: readonly K[]): <V>(list2: readonly V[]) => Array<KeyValuePair<K, V>>;
