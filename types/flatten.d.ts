import * as _ from 'ts-toolbelt';

export function flatten<T extends readonly any[]>(list: T): _.T.Flatten<T>;
