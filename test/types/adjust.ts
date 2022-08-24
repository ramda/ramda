import { expectType, expectError, expectNotAssignable } from "tsd";
import * as R from "../../es/index";

expectType<string[]>(R.adjust(1, R.toUpper, ["a", "b", "c"]));
expectType<string[]>(R.adjust(2, R.toUpper)(["c", "d", "e"]));

expectType<number[]>(R.adjust(2, (n: number) => n * 2)([1, 2, 3]));
expectType<boolean[]>(R.adjust(2, (n: boolean) => !n)([true, false, true]));

expectError(R.adjust(1, R.toString, [1, 2, 3]));
expectError(R.adjust("1", R.toUpper, ["c", "d", "e"]));
expectError(R.adjust(2, R.isNil)([2, 3, 4]));
