export function union<T>(as: readonly T[], bs: readonly T[]): T[];
export function union<T>(as: readonly T[]): (bs: readonly T[]) => T[];
