import { expectType, expectError } from "tsd";
import { test } from "../../es/index";

expectType<boolean>(test(/^x/, 'xyz'));
expectType<boolean>(test(/^y/, 'xyz'));

expectError<boolean>(test(/^y/, 1));
expectError<boolean>(test(/^y/, undefined));
expectError<boolean>(test(/^y/, null));
expectError<boolean>(test(/^y/, NaN));
expectError<boolean>(test(/^y/, ["y"]));
expectError<boolean>(test(/^y/, {y: "y"}));

expectError<boolean>(test(1, "y"));
expectError<boolean>(test(undefined, "y"));
expectError<boolean>(test(null, "y"));
expectError<boolean>(test(NaN, "y"));
expectError<boolean>(test(["y"], "y"));
expectError<boolean>(test({y: "y"}, "y"));



