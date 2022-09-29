import { expectType, expectError } from "tsd";
import * as R from "../../es/index";

expectType<string | boolean>(R.and("a")(false));
expectType<string | boolean>(R.and("true")("true"));
expectType<boolean | boolean>(R.and(false)(true));
expectType<number | boolean>(R.and(1, [2]));
expectType<number[] | boolean>(R.and([2], "1"));
expectType<null | boolean>(R.and(null, undefined));
