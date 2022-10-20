import { expectType, expectError } from 'tsd';
import { __, modify, toString, multiply } from '../../es/index';

type Point = { x: number; y: number };

const p = { x: 2, y: 3 };

const t = modify('x', toString);

expectType<Omit<Point, 'x'> & Record<'x', string>>(modify('x', toString, p));
expectType<<K extends keyof Point>(prop: K) => Omit<Point, K> & Record<K, string>>(modify(__, toString, p));
expectType<Omit<Point, 'x'> & Record<'x', string>>(modify(__, toString, p)('x'));
expectType<<P>(fn: (a: Point['x']) => P) => Omit<Point, 'x'> & Record<'x', P>>(modify('x', __, p));
expectType<Omit<Point, 'x'> & Record<'x', string>>(modify('x', __, p)(toString));
expectType<Omit<Point, 'x'> & Record<'x', string>>(modify(__, __, p)('x', toString));
expectType<Omit<Point, 'x'> & Record<'x', string>>(modify(__, __, p)('x')(toString));
expectType<<T extends Record<'x', number>>(obj: T) => Omit<T, 'x'> & Record<'x', string>>(modify('x', (x: number) => x.toString()));
expectType<Omit<Point, 'x'> & Record<'x', string>>(modify('x', toString)(p));
// must manually set generics for the following to work at all
expectType<Omit<Point, 'x'> & Record<'x', string>>(modify<Point, 'x', string>(__, toString)('x', p));
expectType<Omit<Point, 'x'> & Record<'x', string>>(modify<Point, 'x', string>(__, toString)('x')(p));
expectType<Omit<Point, 'x'> & Record<'x', string>>(modify<Point, 'x', string>('x')(toString, p));
expectType<Omit<Point, 'x'> & Record<'x', string>>(modify<Point, 'x', string>('x')(toString)(p));
