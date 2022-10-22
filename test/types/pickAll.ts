import { expectType } from "tsd";
import { __, pickAll } from "../../es/index";

type Obj = { a: string; b: number };

const obj = {
  a: 'foo',
  b: 5
};

const t = pickAll(['a', 'b'], obj);

// when all names are part of obj, return Pick<T, K> for best typings
expectType<Pick<Obj, 'a' | 'b'>>(pickAll(['a', 'b'], obj));
// else, returns unknown
expectType<unknown>(pickAll(['a', 'b', 'c'], obj));
// else, or whatever is set in the generic
expectType<{ a: string; b: number; c: Function }>(pickAll<Obj, { a: string; b: number; c: Function }>(['a', 'b', 'c'], obj));

expectType<Pick<Obj, 'a' | 'b'>>(pickAll(__, obj)(['a', 'b']));
expectType<unknown>(pickAll(__, obj)(['a', 'b', 'c']));
expectType<Function>(pickAll(__, obj)<Function>(['a', 'b', 'c']));
