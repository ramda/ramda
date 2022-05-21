import { Placeholder } from './util/tools';

export function gte(__: Placeholder, b: number): (a: number) => boolean;
export function gte(__: Placeholder): (b: number, a: number) => boolean;
export function gte(a: number, b: number): boolean;
export function gte(a: string, b: string): boolean;
export function gte(a: number): (b: number) => boolean;