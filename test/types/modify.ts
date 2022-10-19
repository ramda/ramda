import { expectType, expectError } from 'tsd';
import { __, modify, toString, multiply } from '../../es/index';

type Point = { x: number; y: number };

const p = { x: 2, y: 3 };

const times2 = multiply(2);

expectType<Point>(modify('x', times2, p));
expectType<Point>(modify(__, times2, p));

expectType<Omit<Point, 'x'> & Record<'x', string>>(modify('x', toString, p));

// TODO: finish tests
