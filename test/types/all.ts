import { expectType, expectError } from "tsd";
import * as R from "../../es/index";

class TestType {
  constructor(public value: number[]) {}

  all(fn: (a: number) => boolean): boolean {
    return this.value.every(fn);
  }
}

// all(fn, list)
expectType<boolean>(R.all(R.equals(3), [3, 3, 3]));
expectType<boolean>(R.all(R.equals(true), [false, false, false]));
expectType<boolean>(
  R.all((n) => n === "hello", ["Goodbye", "Ciao", "Auf Wiedersehen"])
);

// all({ all }, list)
expectType<boolean>(R.all(R.equals(3), new TestType([3, 3, 3])));

// all(__, list)
expectType<(fn: (a: number) => boolean) => boolean>(R.all(R.__, [3, 3, 3]));
// all(__, list)(fn)
expectType<boolean>(R.all(R.__, [3, 3, 3])(R.equals(3)));

// all(__, { all })
expectType<(fn: (a: number) => boolean) => boolean>(R.all(R.__, new TestType([3, 3, 3])));
// all(__, { all })(fn)
expectType<boolean>(R.all(R.__, new TestType([3, 3, 3]))(R.equals(3)));

// all(fn)(list)
expectType<boolean>(R.all(R.equals(3))([3, 3, 3]));
expectType<boolean>(R.all(R.equals(true))([false, false, false]));
expectType<boolean>(
  R.all((n) => n === "hello")(["Goodbye", "Ciao", "Auf Wiedersehen"])
);

// all (fn)({ all })
expectType<boolean>(R.all(R.equals(3))(new TestType([3, 3, 3])));

expectError(R.all((n: number) => n, [1, 3, 4]));
expectError(R.all((n: string) => n, [5, 6, 7]));
expectError(R.all((n: null | undefined) => n, [null, undefined, null]));

