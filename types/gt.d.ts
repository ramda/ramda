import { Placeholder } from './util/tools';

export function gt(__: Placeholder, b: number): (a: number) => boolean;
export function gt(__: Placeholder): (b: number, a: number) => boolean;
export function gt(a: number, b: number): boolean;
export function gt(a: string, b: string): boolean;
export function gt(a: number): (b: number) => boolean;