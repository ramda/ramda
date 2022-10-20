import { expectType } from "tsd";
import { chain, map, pipe } from "../../es/index";

const duplicate = (n: number) => [n, n];
const toString = (x: number) => x.toString();


expectType<number[]>(chain(duplicate, [1, 2, 3]));
expectType<number[]>(chain(duplicate)([1, 2, 3]));

expectType<string[]>(chain(pipe<[number], number[], string[]>(duplicate, map(toString)), [1, 2, 3]));
expectType<string[]>(chain(pipe<[number], number[], string[]>(duplicate, map(toString)))([1, 2, 3]));

type Thing<A> = {
  value: A;
  chain: <B>(fn: (a: A) => Thing<B>) => Thing<B>
}

const createThing = <A>(value: A): Thing<A> => ({
  value,
  chain: <B>(fn: (a: A) => B) => fn(value)
});

expectType<Thing<string>>(chain((a: number) => createThing(toString(a)), createThing(5)));
expectType<Thing<string>>(chain((a: number) => createThing(toString(a)))(createThing(5)));

// TODO, tests for transducer option
