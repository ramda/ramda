import { expectType, expectError } from 'tsd';
import * as R from '../../es/index';

expectType<number>(R.add(2, 3));
expectType<number>(R.add(7)(10));
expectType<(a: number) => number>(R.add(7));
expectError(R.add('foo', 'bar'));
expectError(R.add('foo')('bar'));

