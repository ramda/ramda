import { expectType, expectError } from "tsd";
import * as R from "../../es/index";

expectType<string>(R.always("a")());
expectType<string[]>(R.always(["a"])());
expectType<number>(R.always(2)());
expectType<{ a: number; b: number; c: number }>(
  R.always({ a: 2, b: 3, c: 4 })()
);
expectType<null>(R.always(null)());
expectType<(...args: unknown[]) => number>(R.always(1));

expectError<(...args: unknown[]) => number>(R.always("a"));
