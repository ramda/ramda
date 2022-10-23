
import * as _ from 'ts-toolbelt';

export function construct<A extends any[], T>(
  constructor: { new (...a: A): T } | ((...a: A) => T),
): _.F.Curry<(...a: A) => T>;
