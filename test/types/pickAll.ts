import { expectType } from "tsd";
import { __, pickAll } from "../../es/index";

type Obj = { a: string; b: number };

const obj = {
  a: 'foo',
  b: 5
};

const t = pickAll(['a', 'b'], obj);

// pickAll (__, obj)(names) when all names are keyof obj
expectType<Pick<Obj, 'a' | 'b'>>(pickAll(__, obj)(['a', 'b']));
// pickAll (__, obj)(names) if not all names are keyof obj
expectType<unknown>(pickAll(__, obj)(['a', 'b', 'c']));
expectType<Function>(pickAll(__, obj)<Function>(['a', 'b', 'c']));

// pickAll(names, obj) when all names are keyof obj
expectType<Pick<Obj, 'a' | 'b'>>(pickAll(['a', 'b'], obj));
// pickAll(names, obj) if not all names are keyof obj
expectType<unknown>(pickAll(['a', 'b', 'c'], obj));

// pickAll(names)(obj) test names if all are keyof obj to return best type
expectType<Pick<Obj, 'a' | 'b'>>(pickAll(['a', 'b'], obj));
expectType<unknown>(pickAll(['a', 'b', 'c'], obj));
expectType<{ a: string; b: number; c: Function }>(pickAll<Obj, { a: string; b: number; c: Function }>(['a', 'b', 'c'], obj));
