export function toPairs<O extends object, K extends Extract<keyof O, string | number>>(
  obj: O,
): Array<{ [key in K]: [`${key}`, O[key]] }[K]>;
export function toPairs<S>(obj: Record<string | number, S>): Array<[string, S]>;
