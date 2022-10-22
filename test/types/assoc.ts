import { expectType } from "tsd";
import { __, assoc } from "../../es/index";

type Point = { x: number; y: number };
const p: Point = { x: 2, y: 3 };

// assoc(__, val, obj)(prop), this tests if prop is keyof obj and if val is typeof obj[prop] for best return type
expectType<Point>(assoc(__, 5, p)('x'));
expectType<Record<'x', string> & Omit<Point, 'x'>>(assoc(__, '5', p)('x'));
expectType<Point & Record<'z', number>>(assoc(__, 5, p)('z'));

// assoc(prop, __, obj)(val), when K is keyof obj, tests if val is typeof obj[prop] for best return type
expectType<Point>(assoc('x', __, p)(5));
expectType<Record<'x', string> & Omit<Point, 'x'>>(assoc('x', __, p)('5'));

// assoc(prop, __, obj)(val), when prop is not keyof obj
expectType<Point & Record<'z', number>>(assoc('z', __, p)(5));

// assoc(prop, val, obj) when prop is keyof obj and val is same type
expectType<Point>(assoc('x', 5, p));

// assoc(prop, val, obj) when prop is keyof obj  and val is not same type
expectType<Record<'x', string> & Omit<Point, 'x'>>(assoc('x', '5', p));

// assoc(prop, val, obj) when prop is not keyof obj
expectType<Point & Record<'z', number>>(assoc('z', 5, p));

// assoc(__, val)(__, obj)(prop), prop is keyof obj, tests if val is typeof obj[prop] for best return type
expectType<Point>(assoc(__, 5)(__, p)('x'));
expectType<Record<'x', string> & Omit<Point, 'x'>>(assoc(__, '5')(__, p)('x'));
// assoc(__, val)(__, obj)(prop), prop is not keyof obj
expectType<Point & Record<'z', number>>(assoc(__, 5)(__, p)('z'));

// assoc(__, val)(prop, obj), when obj has key prop, tests if val is typeof obj[prop] for best return type
expectType<Point>(assoc(__, 5)('x', p));
expectType<Record<'x', string> & Omit<Point, 'x'>>(assoc(__, '5')('x', p));
// assoc(__, val)(prop, obj), when obj does not have key prop
expectType<Point & Record<'z', number>>(assoc(__, 5)('z', p));

// assoc(__, val)(prop)(obj) when obj has key prop, tests if val is typeof obj[prop] for best return type
expectType<Point>(assoc(__, 5)('x')(p));
expectType<Record<'x', string> & Omit<Point, 'x'>>(assoc(__, '5')('x')(p));
// assoc(__, val)(prop)(obj) when obj does not have key prop
expectType<Point & Record<'z', number>>(assoc(__, 5)('z')(p));

// assoc(prop, val)(obj), when obj has key prop, tests if val is typeof obj[prop] for best return type
expectType<Point>(assoc('x', 5)(p));
expectType<Record<'x', string> & Omit<Point, 'x'>>(assoc('x', '5')(p));
// assoc(prop, val)(obj), when obj does not have key prop
expectType<Point & Record<'z', number>>(assoc('z', 5)(p));

// assoc(prop)(__, obj)(val) when obj has key prop and if val is typeof obj[prop]
expectType<Point>(assoc('x')(__, p)(5));
// assoc(prop)(__, obj)(val) when obj has key prop and if val is not typeof obj[prop]
expectType<Record<'x', string> & Omit<Point, 'x'>>(assoc('x')(__, p)('5'));
// assoc(prop)(__, obj) when prop is not keyof obj
expectType<Point & Record<'z', number>>(assoc('z')(__, p)(5));

// assoc(prop)(val, obj) when obj has key prop, tests if val is typeof obj[prop] for best return type
expectType<Point>(assoc('x')(5, p));
expectType<Record<'x', string> & Omit<Point, 'x'>>(assoc('x')('5', p));
// assoc(prop)(val, obj) when obj does not have a key prop
expectType<Point & Record<'z', number>>(assoc('z')(5, p));

// assoc(prop)(val)(obj) when obj has key prop and val is typeof obj[prop]
expectType<Point>(assoc('x')(5)(p));
// assoc(prop)(val)(obj) when obj has key prop and val is not typeof obj[prop]
expectType<Record<'x', string> & Omit<Point, 'x'>>(assoc('x')('5')(p));
// assoc(prop)(val)(obj) when obj does not have key prop
expectType<Point & Record<'z', number>>(assoc('z')(5)(p));
