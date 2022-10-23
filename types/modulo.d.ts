import { Placeholder } from './util/tools';

export function modulo(__: Placeholder, b: number): (a: number) => number;
export function modulo(__: Placeholder): (b: number, a: number) => number;
export function modulo(a: number, b: number): number;
export function modulo(a: number): (b: number) => number;
