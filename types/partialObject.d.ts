// NOTE: The objects are merged deeply - meaning this should be `DeepOmit` (ideally `& Partial<Omitted>` too)
export function partialObject<T extends P1, P1, R>(fn: (value: T) => R, partial: P1): (value: Omit<T, keyof P1>) => R;
export function partialObject<T, R>(fn: (value: T) => R): <P1>(partial: P1) => (value: Omit<T, keyof P1>) => R;