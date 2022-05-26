import { Placeholder } from './util/tools';

export function concat(
    placeholder: Placeholder,
): (<L1 extends any[], L2 extends any[]>(list1: L1, list2: L2) => [...L1, ...L2]) &
    (<S1 extends string, S2 extends string>(s1: S1, s2: S2) => `${S1}${S2}`);
export function concat<L2 extends any[]>(
    placeholder: Placeholder,
    list2: L2,
): <L1 extends any[]>(list1: L1) => [...L1, ...L2];
export function concat<S2 extends string>(
    placeholder: Placeholder,
    s2: S2,
): <S1 extends string>(s1: S1) => `${S1}${S2}`;
export function concat<L1 extends any[]>(list1: L1): <L2 extends any[]>(list2: L2) => [...L1, ...L2];
export function concat<S1 extends string>(s1: S1): <S2 extends string>(s2: S2) => `${S1}${S2}`;
export function concat<L1 extends any[], L2 extends any[]>(list1: L1, list2: L2): [...L1, ...L2];
export function concat<S1 extends string, S2 extends string>(s1: S1, s2: S2): `${S1}${S2}`;
export function concat(s1: string, s2: string): string;
export function concat(s1: string): (s2: string) => string;