import { expectType, expectError } from "tsd";
import * as R from "../../es/index";

const double = (n: number) => n * 2;

// adjust(index, fn, list)
expectType<string[]>(R.adjust(2, R.toUpper, ["a", "b", "c"]));
expectType<number[]>(R.adjust(2, R.multiply(2), [1, 2, 3]));
expectType<boolean[]>(R.adjust(2, R.not, [true, false, true]));
// adjust(index, fn)(list)
expectType<string[]>(R.adjust(2, R.toUpper)(["a", "b", "c"]));
expectType<number[]>(R.adjust(2, R.multiply(2))([1, 2, 3]));
expectType<boolean[]>(R.adjust(2, R.not)([true, false, true]));

// adjust(index)(fn, list)
expectType<string[]>(R.adjust(2)(R.toUpper, ["a", "b", "c"]));
expectType<number[]>(R.adjust(2)(R.multiply(2), [1, 2, 3]));
expectType<boolean[]>(R.adjust(2)(R.not, [true, false, true]));

// adjust(index)(__, list)(fn)
expectType<string[]>(R.adjust(2)(R.__, ["a", "b", "c"])(R.toUpper));
expectType<number[]>(R.adjust(2)(R.__, [1, 2, 3])(R.multiply(2)));
expectType<boolean[]>(R.adjust(2)(R.__, [true, false, true])(R.not));

// adjust(index)(fn)(list)
expectType<string[]>(R.adjust(2)(R.toUpper)(["a", "b", "c"]));
expectType<number[]>(R.adjust(2)(R.multiply(2))([1, 2, 3]));
expectType<boolean[]>(R.adjust(2)(R.not)([true, false, true]));

// adjust(__, fn, list)(index)
expectType<string[]>(R.adjust(R.__, R.toUpper, ["a", "b", "c"])(1));
expectType<number[]>(R.adjust(R.__, R.multiply(2), [1, 2, 3])(1));
expectType<boolean[]>(R.adjust(R.__, R.not, [true, false, true])(1));

// adjust(index, __, list)(fn)
expectType<string[]>(R.adjust(1, R.__, ["a", "b", "c"])(R.toUpper));
expectType<number[]>(R.adjust(1, R.__, [1, 2, 3])(R.multiply(2)));
expectType<boolean[]>(R.adjust(1, R.__, [true, false, true])(R.not));

// adjust(__, __, list)(index, fn)
expectType<string[]>(R.adjust(R.__, R.__, ["a", "b", "c"])(1, R.toUpper));
expectType<number[]>(R.adjust(R.__, R.__, [1, 2, 3])(1, R.multiply(2)));
expectType<boolean[]>(R.adjust(R.__, R.__, [true, false, true])(1, R.not));

// adjust(__, __, list)(__, fn)(index)
expectType<string[]>(R.adjust(R.__, R.__, ["a", "b", "c"])(R.__, R.toUpper)(1));
expectType<number[]>(R.adjust(R.__, R.__, [1, 2, 3])(R.__, R.multiply(2))(1));
expectType<boolean[]>(R.adjust(R.__, R.__, [true, false, true])(R.__, R.not)(1));

// adjust(__, __, list)(index)(fn)
expectType<string[]>(R.adjust(R.__, R.__, ["a", "b", "c"])(1)(R.toUpper));
expectType<number[]>(R.adjust(R.__, R.__, [1, 2, 3])(1)(R.multiply(2)));
expectType<boolean[]>(R.adjust(R.__, R.__, [true, false, true])(1)(R.not));

expectError(R.adjust(1, R.toString, [1, 2, 3]));
expectError(R.adjust(1, R.inc, ["c", "d", "e"]));
expectError(R.adjust("1", R.toUpper, ["c", "d", "e"]));
expectError(R.adjust(2, R.isNil)([2, 3, 4]));
