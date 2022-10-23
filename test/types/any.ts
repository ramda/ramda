import { expectType, expectError } from 'tsd';
import * as R from '../../es/index';

expectType<boolean>(R.any(R.isNotNil, [1, 2, null]));
expectType<boolean>(R.any(R.isNil, [null, 2, undefined]));
expectType<boolean>(R.any(R.flip(R.lt)(0), [1, 2, -1]));
expectType<boolean>(R.any(R.flip(R.lt)(0), [1, 2, -1]));
expectType<boolean>(R.any(R.is(String), [1, 2, -1]));
expectType<boolean>(R.any(R.is(Number), [1, 2, -1]));

expectError(R.any(R.flip(R.lt)(0), [null, 2, undefined]));
expectError(R.any(R.flip(R.lt)(0), { a: 2, b: 3 }));
expectError(R.any(R.flip(R.lt)(0), 'error!'));
