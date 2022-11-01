import { expectType, expectError } from "tsd";
import { inc } from "../../es/index";

expectType<number>(inc(1));
expectType<number>(NaN);

expectError<number>(inc("1"));
expectError<number>(inc(true));
expectError<number>(inc(undefined));
expectError<number>(inc([1]));
expectError<number>(inc(["2"]));


