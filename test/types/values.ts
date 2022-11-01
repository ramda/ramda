import { expectType, expectError } from "tsd";
import { values } from "../../es/index";

expectType<number[]>(values({a: 1, b: 2, c: 3}));
expectType<string[]>(values({a: "1", b: "2", c: "3"}));
expectType<null[]>(values({a: null, b: null, c: null}));
expectType<undefined[]>(values({a: undefined, b: undefined, c: undefined}));
expectType<Array<string | number>>(values({a: 1, b: "2", c: 3}));
expectType<Array<string | number | null>>(values({a: 1, b: "2", c: null}));
expectType<Array<string | number | null | undefined>>(values({a: 1, b: "2", c: null, d: undefined}));

