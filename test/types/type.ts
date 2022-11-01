import { expectType } from "tsd";
import { type } from "../../es/index";
import { TypeFunctionReturnTypes } from "../../types/type";

expectType<TypeFunctionReturnTypes>(type({ a: 1 }));
expectType<TypeFunctionReturnTypes>(type(1));
expectType<TypeFunctionReturnTypes>(type(true));
expectType<TypeFunctionReturnTypes>(type("string"));
expectType<TypeFunctionReturnTypes>(type(null));
expectType<TypeFunctionReturnTypes>(type([1, 2, 3]));
expectType<TypeFunctionReturnTypes>(type(new RegExp("ab+c")));
expectType<TypeFunctionReturnTypes>(type(() => 1 + 2));
expectType<TypeFunctionReturnTypes>(type(undefined));
expectType<TypeFunctionReturnTypes>(type(Symbol("test")));
expectType<TypeFunctionReturnTypes>(type(new Error("System failure!")));
expectType<TypeFunctionReturnTypes>(type(new Date()));
expectType<TypeFunctionReturnTypes>(type(NaN));
