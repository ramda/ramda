import { expectType, expectError } from "tsd";
import * as R from "../../es/index";

expectType<string | false>(R.and("a")(false));
expectType<string>(R.and("true")("true"));
expectType<boolean | boolean>(R.and(false)(true));
expectType<1 | number[]>(R.and(1, [2]));
expectType<number[] | "1">(R.and([2], "1"));
expectType<null | undefined>(R.and(null, undefined));
