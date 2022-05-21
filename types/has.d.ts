import { Placeholder, ObjectHavingSome } from './util/tools';

export function has(__: Placeholder, obj: unknown): (s: string) => boolean;
export function has(__: Placeholder): <P extends string>(obj: unknown, s: P) => obj is ObjectHavingSome<P>;
export function has<P extends string>(s: P, obj: unknown): obj is ObjectHavingSome<P>;
export function has<P extends string>(s: P): (obj: unknown) => obj is ObjectHavingSome<P>;