import { Placeholder } from './util/tools';

export function lt(__: Placeholder, b: number): (a: number) => boolean;
export function lt(__: Placeholder): (b: number, a: number) => boolean;
export function lt(a: number, b: number): boolean;
export function lt(a: string, b: string): boolean;
export function lt(a: number): (b: number) => boolean;