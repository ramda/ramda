import { expectType } from "tsd";
import { includes, __ } from "../../es/index";

expectType<boolean>(includes(2, ["1", 2, "3", null, undefined, NaN]));
expectType<boolean>(includes("1", ["1", 2, "3", null, undefined, NaN]));
expectType<boolean>(includes(null, ["1", 2, "3", null, undefined, NaN]));
expectType<boolean>(includes(undefined, ["1", 2, "3", null, undefined, NaN]));
expectType<boolean>(includes(NaN, ["1", 2, "3", null, undefined, NaN]));
expectType<boolean>(includes(__, ["1", 2, "3", null, undefined, NaN])(NaN));
expectType<(list: readonly number[]) => boolean>(includes(1));
expectType<(target: string | number | null | undefined) => boolean>(includes(__, ["1", 2, "3", null, undefined, NaN]));
expectType<boolean>(includes(1)([1, 2, 3]));

