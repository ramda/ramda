import { Placeholder } from './util/tools';

// append(__, list)(el)
export function append<T>(__: Placeholder, list: readonly T[]): (el: T) => T[];
// append(el, list)
export function append<T>(el: T, list: readonly T[]): T[];
// append(el)(list)
export function append<T>(el: T): (list: readonly T[]) => T[];
