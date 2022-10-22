import { expectType } from 'tsd';
import { __, modify, toString } from '../../es/index';

type Point = { x: number; y: number };

const p = { x: 2, y: 3 };

// modify(prop, fn, obj)
expectType<Omit<Point, 'x'> & Record<'x', string>>(modify('x', toString, p));

// modify(__, fn, obj)(prop)
expectType<Omit<Point, 'x'> & Record<'x', string>>(modify(__, toString, p)('x'));

// modify(prop, __, obj)(prop)
expectType<<P>(fn: (a: Point['x']) => P) => Omit<Point, 'x'> & Record<'x', P>>(modify('x', __, p));
expectType<Omit<Point, 'x'> & Record<'x', string>>(modify('x', __, p)(toString));

// modify(__, __, obj)(fn, prop)
expectType<Omit<Point, 'x'> & Record<'x', string>>(modify(__, __, p)('x', toString));
// modify(__, __)(fn)(prop)
expectType<Omit<Point, 'x'> & Record<'x', string>>(modify(__, __, p)('x')(toString));

// modify(prop, fn)(obj)
expectType<<T extends Record<'x', number>>(obj: T) => Omit<T, 'x'> & Record<'x', string>>(modify('x', (x: number) => x.toString()));
expectType<Omit<Point, 'x'> & Record<'x', string>>(modify('x', toString)(p));

// modify(_, fn)(prop, obj)
expectType<Omit<Point, 'x'> & Record<'x', string>>(modify(__, toString)('x', p));
// modify(_, fn)(prop)(obj)
expectType<Omit<Point, 'x'> & Record<'x', string>>(modify(__, toString)('x')(p));

// modify(prop)(fn, obj)
expectType<Omit<Point, 'x'> & Record<'x', string>>(modify('x')(toString, p));
// modify(prop)(fn)(obj)
expectType<Omit<Point, 'x'> & Record<'x', string>>(modify('x')(toString)(p));
