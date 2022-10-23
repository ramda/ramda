export function complement<T, TFiltered extends T>(
  pred: (value: T) => value is TFiltered,
): (value: T) => value is Exclude<T, TFiltered>;
export function complement<TArgs extends any[]>(pred: (...args: TArgs) => unknown): (...args: TArgs) => boolean;
