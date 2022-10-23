import { Placeholder } from './util/tools';

export function mathMod(__: Placeholder, b: number): (a: number) => number;
export function mathMod(__: Placeholder): (b: number, a: number) => number;
export function mathMod(a: number, b: number): number;
export function mathMod(a: number): (b: number) => number;
