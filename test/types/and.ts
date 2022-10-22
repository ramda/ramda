import { expectAssignable, expectType, expectError } from 'tsd';
import { __, and } from '../../es/index';

// literal types will return their literal types
// eg function identity<T>(v: T) => v;
// identity('a') // type 'a'
// the type definition for `and` is (a: A, b: B) => A | B
// this means `and('a', 'b')` returns `'a' | 'b'
// however, `'a' | 'b'` is assignable to `string
// just as `and('a', 1)` returns `'a' | 1`, but is assignable to `string | number`
// so it makes more sense to test this function is `expectAssignable` versus `expectType`

// and(string, boolean) => `string | boolean`
expectAssignable<string | boolean>(and('a', false));
expectAssignable<<A>(a: A) => A | boolean>(and(__, false));
expectAssignable<string | boolean>(and(__, false)('a'));

// and(string, string) => `string | string` which is just `string`
expectAssignable<string>(and('true', 'false'));
expectAssignable<<A>(a: A) => A | string>(and(__, 'false'));
expectAssignable<string>(and(__, 'false')('true'));

// and(number, string) => `number | string`
expectAssignable<number | string>(and(1, 'a'));
expectAssignable<<A>(a: A) => A | string>(and(__, 'a'));
expectAssignable<number | string>(and(1)('a'));
