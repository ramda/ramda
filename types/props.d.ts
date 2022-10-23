export function props<P extends string, T>(ps: readonly P[], obj: Record<P, T>): T[];
export function props<P extends string>(ps: readonly P[]): <T>(obj: Record<P, T>) => T[];
export function props<P extends string, T>(ps: readonly P[]): (obj: Record<P, T>) => T[];
