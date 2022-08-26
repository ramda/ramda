import { expectType, expectError } from "tsd";
import * as R from "../../es/index";

expectType<boolean>(R.and("a")(false));
expectType<boolean>(R.and("true")("true"));
expectType<boolean>(R.and(false)(true));
expectType<boolean>(R.and(1, [2]));
expectType<boolean>(R.and("1", [2]));
expectType<boolean>(R.and({ a: 1, b: 2, c: 3 }, [2]));
expectType<boolean>(R.and(null, undefined));
