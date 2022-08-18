export function isNotNil<T>(
  value: T
): T extends null | undefined ? false : true;
