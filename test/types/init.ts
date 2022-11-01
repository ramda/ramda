import { expectType, expectError } from "tsd";
import { init } from "../../es/index";

expectType<number[]>(init([1, 2, 3, 4]));
expectType<string[]>(init(["1", "2", "3", "4"]));
expectType<null[]>(init([null, null]));
expectType<boolean[]>(init([true, false]));
expectType<never[]>(init([]));
expectType<number[]>(init([1]));

expectError<boolean[]>(init([true, 1]));
expectError<boolean[]>(init([false, "2"]));
expectError<boolean[]>(init([false, null]));




