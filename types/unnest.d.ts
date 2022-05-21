import * as _ from 'ts-toolbelt';

export function unnest<T extends readonly any[]>(list: T): _.T.UnNest<T>;