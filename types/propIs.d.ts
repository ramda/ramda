export function propIs<C extends (...args: any[]) => any, K extends keyof any>(
  type: C,
  name: K,
  obj: any,
): obj is Record<K, ReturnType<C>>;
export function propIs<C extends new (...args: any[]) => any, K extends keyof any>(
  type: C,
  name: K,
  obj: any,
): obj is Record<K, InstanceType<C>>;
export function propIs<C extends (...args: any[]) => any, K extends keyof any>(
  type: C,
  name: K,
): (obj: any) => obj is Record<K, ReturnType<C>>;
export function propIs<C extends new (...args: any[]) => any, K extends keyof any>(
  type: C,
  name: K,
): (obj: any) => obj is Record<K, InstanceType<C>>;
export function propIs<C extends (...args: any[]) => any>(
  type: C,
): {
  <K extends keyof any>(name: K, obj: any): obj is Record<K, ReturnType<C>>;
  <K extends keyof any>(name: K): (obj: any) => obj is Record<K, ReturnType<C>>;
};
export function propIs<C extends new (...args: any[]) => any>(
  type: C,
): {
  <K extends keyof any>(name: K, obj: any): obj is Record<K, InstanceType<C>>;
  <K extends keyof any>(name: K): (obj: any) => obj is Record<K, InstanceType<C>>;
};
