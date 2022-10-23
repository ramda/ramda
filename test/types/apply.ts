import { expectType, expectError } from 'tsd';
import { __, apply } from '../../es/index';

const func1 = (a: string) => a;
const func2 = (a: string, b: string) => a + b;
const func3 = (a: string, b: string, c: string) => a + b + c;

// apply(fn, args)
expectType<string>(apply(func1, ['a']));
expectType<string>(apply(func2, ['a', 'b']));
expectType<string>(apply(func3, ['a', 'b', 'c']));
// fails for arity mismatch
expectError(apply(func3, ['a', 'b', 'c', 'd']));
// fails for arg position type mismatch
expectError(apply(func3, ['a', 2, 'c']));

// apply(fn,)(args)
expectType<string>(apply(func1)(['a']));
expectType<string>(apply(func2)(['a', 'b']));
expectType<string>(apply(func3)(['a', 'b', 'c']));
// fails for arity mismatch
expectError(apply(func3)(['a', 'b', 'c', 'd']));
// fails for arg position type mismatch
expectError(apply(func3)(['a', 2, 'c']));

const t = apply(__, ['a', 'b']);

// apply (__, args)(fn)
// worst case is fn is constraints to an array of types, eg `Array<string | number>`
expectType<<F extends (...args: Array<string | number>) => any>(fn: F) => ReturnType<F>>(apply(__, ['a', 2, 'c']))
expectType<string>(apply(__, ['a', 'b', 'c'])(func3));
// fails when types in func3 arg don't match with types in args
expectError(apply(__, ['a', 2, 'c'])(func3));
// but ok if types match, but arity length mismatch (nothing we can do about that)
expectType<string>(apply(__, ['a', 'b'])(func3));
// when generic is manually set, it can constrain both args and func
expectType<<F extends (...args: [string, number]) => any>(fn: F) => ReturnType<F>>(apply<[string, number]>(__, ['a', 2]))
// good
expectType<string>(apply<[string, string]>(__, ['a', 'b'])(func2));
// fails when position type different
expectError(apply<[string, string]>(__, ['a', 2])(func2));
// fails when arity length is different
expectError(apply<[string, string]>(__, ['a', 'b'])(func3));
