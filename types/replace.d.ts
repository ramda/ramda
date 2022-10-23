export function replace(
  pattern: RegExp | string,
  replacement: string | ((match: string, ...args: readonly any[]) => string),
  str: string,
): string;
export function replace(
  pattern: RegExp | string,
  replacement: string | ((match: string, ...args: readonly any[]) => string),
): (str: string) => string;
export function replace(
  pattern: RegExp | string,
): (replacement: string | ((match: string, ...args: readonly any[]) => string)) => (str: string) => string;
