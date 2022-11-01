import { expectType } from "tsd";
import { indexOf } from "../../es/index";

expectType<number>(indexOf(2, ["1", 2, "3", null, undefined, NaN, true]));
expectType<number>(indexOf("1", ["1", 2, "3", null, undefined, NaN, true]));
expectType<number>(indexOf(null, ["1", 2, "3", null, undefined, NaN, true]));
expectType<number>(indexOf(undefined, ["1", 2, "3", null, undefined, NaN, true]));
expectType<number>(indexOf(NaN, ["1", 2, "3", null, undefined, NaN, true]));
expectType<number>(indexOf(true, ["1", 2, "3", null, undefined, NaN, true]));

expectType<number>(indexOf(2)([1, 2, 3]));
expectType<(list: readonly boolean[]) => number>(indexOf(true));


