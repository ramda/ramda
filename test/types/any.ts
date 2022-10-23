import { expectType, expectError } from "tsd";
import * as R from "../../es/index";

class TestType {
  constructor(public value: number[]) {}

  any(fn: (a: number) => boolean): boolean {
    return this.value.some(fn);
  }
}

// any(fn, list)
expectType<boolean>(R.any(R.equals(3), [3, 3, 3]));
expectType<boolean>(R.any(R.equals(true), [false, false, false]));
expectType<boolean>(
  R.any((n) => n === "hello", ["Goodbye", "Ciao", "Auf Wiedersehen"])
);

// any (fn, { any })
expectType<boolean>(R.any(R.equals(3), new TestType([3, 3, 3])));

// any (__, list)
expectType<(fn: (a: number) => boolean) => boolean>(R.any(R.__, [3, 3, 3]));
// any(__, list)(fn)
expectType<boolean>(R.any(R.__, [3, 3, 3])(R.equals(3)));

// any(__, { any })
expectType<(fn: (a: number) => boolean) => boolean>(R.any(R.__, new TestType([3, 3, 3])));
// any(__, { any })(fn)
expectType<boolean>(R.any(R.__, new TestType([3, 3, 3]))(R.equals(3)));

// any(fn)(list)
expectType<boolean>(R.any(R.equals(3))([3, 3, 3]));
expectType<boolean>(R.any(R.equals(true))([false, false, false]));
expectType<boolean>(
  R.any((n) => n === "hello")(["Goodbye", "Ciao", "Auf Wiedersehen"])
);

// any (fn)({ any })
expectType<boolean>(R.any(R.equals(3))(new TestType([3, 3, 3])));

// fails when fn is not <T>(a: T) => boolean
expectError(R.any((n: number) => n, [1, 3, 4]));
// fails when fn's `a` argument and list's T are not the same
expectError(R.any((n: string) => true, [5, 6, 7]));

// when fn is generic, handles when list is multiple types, eg (number | null)[]
expectType<boolean>(R.any(R.isNotNil, [1, 2, null]));
expectType<boolean>(R.any(R.isNil, [null, 2, undefined]));
expectType<boolean>(R.any(R.flip(R.lt)(0), [1, 2, -1]));
expectType<boolean>(R.any(R.flip(R.lt)(0), [1, 2, -1]));
expectType<boolean>(R.any(R.is(String), [1, 2, -1]));
expectType<boolean>(R.any(R.is(Number), [1, 2, -1]));

// fails when fn a is a single type but list is multiple, eg a: number and list is (number | null | undefined)[]
expectError(R.any(R.flip(R.lt)(0), [null, 2, undefined]));
// fails when list is an object that is not { any }
expectError(R.any(R.flip(R.lt)(0), { a: 2, b: 3 }));
// fails when list is a string but fn is expecting a number
expectError(R.any(R.flip(R.lt)(0), "error!"));
