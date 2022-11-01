import { expectType, expectError } from "tsd";
import { identity } from "../../es/index";

expectType<1>(identity(1));
expectType<"a">(identity("a"));
expectType<true>(identity(true));
expectType<object>(identity({}));
expectType<[1]>(identity([1]));
expectType<typeof NaN>(identity(NaN));
expectType<undefined>(identity(undefined));



expectError<["1"]>(identity([1]));
expectError<true>(identity(false));
expectError<1>(identity(2));
expectError<1>(identity(NaN));



