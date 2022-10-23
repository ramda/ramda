import { expectType } from "tsd";
import { __, andThen } from "../../es/index";

const aToB = (a: number): string => a.toString();
const aToPb = (a: number): Promise<string> => Promise.resolve(a.toString());

expectType<Promise<string>>(andThen(aToB, Promise.resolve(2)));
expectType<Promise<string>>(andThen(__, Promise.resolve(2))(aToB));
expectType<Promise<string>>(andThen(aToB)(Promise.resolve(2)));

expectType<Promise<string>>(andThen(aToPb, Promise.resolve(2)));
expectType<Promise<string>>(andThen(__, Promise.resolve(2))(aToPb));
expectType<Promise<string>>(andThen(aToPb)(Promise.resolve(2)));
