import { KeyValuePair } from './util/tools';

export function fromPairs<V>(
    pairs: ReadonlyArray<Readonly<KeyValuePair<string, V>>> | ReadonlyArray<Readonly<KeyValuePair<number, V>>>,
): { [index: string]: V };