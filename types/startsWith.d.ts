export function startsWith(substr: string, str: string): boolean;
export function startsWith(substr: string): (str: string) => boolean;
export function startsWith<T>(subList: readonly T[], list: readonly T[]): boolean;
export function startsWith<T>(subList: readonly T[]): (list: readonly T[]) => boolean;
