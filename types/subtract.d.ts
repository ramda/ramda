import { Placeholder } from './util/tools';

export function subtract(__: Placeholder, b: number): (a: number) => number;
export function subtract(__: Placeholder): (b: number, a: number) => number;
export function subtract(a: number, b: number): number;
export function subtract(a: number): (b: number) => number;
