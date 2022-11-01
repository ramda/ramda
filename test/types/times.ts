import { expectType, expectError } from "tsd";
import { times, identity, type, TypeFunctionReturnTypes } from "../../es/index";

expectType<number[]>(times(identity, 5));
expectType<TypeFunctionReturnTypes[]>(times(type, 5));


expectError<string[]>(times(identity, 5));
expectError<number[]>(times(type, 5));
