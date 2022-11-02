import { expectType, expectError } from "tsd";
import { without } from "../../es/index";

expectType<(list2: readonly number[]) => number[]>(without([1, 2, 3]));
expectType<number[]>(without([1, 2, 3], [1]));
expectType<string[]>(without(["1", "2", "3"], ["1"]));
expectType<Array<string | number | null>>(without(["1", 2, "3", null], ["1"]));

expectError<(list2: readonly number[]) => string[]>(without([1, 2, 3]));
expectError<(list2: readonly string[]) => number[]>(without([1, 2, 3]));
expectError<string[]>(without([1, 2, 3], [1]));


