import { Placeholder } from './util/tools';

export function lte(__: Placeholder, b: number): (a: number) => boolean;
export function lte(__: Placeholder): (b: number, a: number) => boolean;
export function lte(a: number, b: number): boolean;
export function lte(a: string, b: string): boolean;
export function lte(a: number): (b: number) => boolean;