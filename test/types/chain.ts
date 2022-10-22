import { expectType } from "tsd";
import { chain, map, pipe } from "../../es/index";

const duplicate = (n: number) => [n, n];
const toString = (x: number) => x.toString();

// chain(fn, list)
expectType<number[]>(chain(duplicate, [1, 2, 3]));
// chain(fn)(list)
expectType<number[]>(chain(duplicate)([1, 2, 3]));

type Thing<A> = {
  value: A;
  chain: <B>(fn: (a: A) => Thing<B>) => Thing<B>
}

const createThing = <A>(value: A): Thing<A> => ({
  value,
  chain: <B>(fn: (a: A) => B) => fn(value)
});

// chain(fn, monad)
expectType<Thing<string>>(chain((a: number) => createThing(toString(a)), createThing(5)));
// chain(fn)(monad)
expectType<Thing<string>>(chain((a: number) => createThing(toString(a)))(createThing(5)));

// chain (f, g)(x)
expectType<string[]>(chain(pipe<[number], number[], string[]>(duplicate, map(toString)), [1, 2, 3]));
// chain (f)(g)(x)
expectType<string[]>(chain(pipe<[number], number[], string[]>(duplicate, map(toString)))([1, 2, 3]));

// TODO, tests for transducer option
