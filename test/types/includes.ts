import { expectType } from "tsd";
import { includes } from "../../es/index";

expectType<boolean>(includes(2, ["1", 2, "3", null, undefined, NaN]));
expectType<boolean>(includes("1", ["1", 2, "3", null, undefined, NaN]));
expectType<boolean>(includes(null, ["1", 2, "3", null, undefined, NaN]));
expectType<boolean>(includes(undefined, ["1", 2, "3", null, undefined, NaN]));
expectType<boolean>(includes(NaN, ["1", 2, "3", null, undefined, NaN]));
expectType<(list: readonly number[]) => boolean>(includes(1));
expectType<boolean>(includes(1)([1, 2, 3]));

