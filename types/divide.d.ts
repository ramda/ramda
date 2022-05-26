import { Placeholder } from './util/tools';

export function divide(__: Placeholder, b: number): (a: number) => number;
export function divide(__: Placeholder): (b: number, a: number) => number;
export function divide(a: number, b: number): number;
export function divide(a: number): (b: number) => number;