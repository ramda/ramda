import { MergeAll } from './util/tools';

export function mergeAll<Os extends readonly object[]>(list: Os): MergeAll<Os>;
