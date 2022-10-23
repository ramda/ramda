import * as _ from 'ts-toolbelt';

export function curry<F extends (...args: any) => any>(f: F): _.F.Curry<F>;
