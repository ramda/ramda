import { expectType, expectError } from "tsd";
import * as R from "../../es/index";

expectType<number[]>(R.dropRepeatsBy(Math.abs, [1, -1, -2, 2, 3, 100]));
expectType<number[]>(R.dropRepeatsBy(Math.abs)([1, -1, -2, 2, 3, 100]));
expectType<(list: readonly number[]) => number[]>(R.dropRepeatsBy(Math.abs));
expectError(R.dropRepeatsBy(Math.abs, ["1", "-1", "-2", "100"]));
expectError(R.dropRepeatsBy(Math.abs)(["1", "-1", "-2", "100"]));
