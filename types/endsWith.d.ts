export function endsWith(substr: string, str: string): boolean;
export function endsWith(substr: string): (str: string) => boolean;
export function endsWith<T>(subList: readonly T[], list: readonly T[]): boolean;
export function endsWith<T>(subList: readonly T[]): (list: readonly T[]) => boolean;
