import { expectType, expectAssignable, expectError } from 'tsd';
import { __, append } from '../../es/index';

expectType<number[]>(append(3, [1, 2]));
expectType<number[]>(append(3)([1, 2]));
expectType<number[]>(append(__, [1, 2])(3));

expectType<string[]>(append('c', ['a', 'b']));
expectType<string[]>(append('c')(['a', 'b']));
expectType<string[]>(append(__, ['a', 'b'])('c'));

// typescript returns literal type when applying to an empty string `3[]`
// so use expectAssignable here
expectAssignable<number[]>(append(3, []));
expectAssignable<number[]>(append(3)([]));

// if you don't set the generic her, T is `never` and will through an error
expectError<number[]>(append(__, [])(3));
// setting the generic manually fixes it
expectType<number[]>(append<number>(__, [])(3));
