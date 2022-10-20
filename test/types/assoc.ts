import { expectType } from "tsd";
import { __, assoc } from "../../es/index";
import { AssocPartialOne} from '../../types/util/tools';

type Point = { x: number; y: number };
const p: Point = { x: 2, y: 3 };

const t = assoc('x')(5, p);

expectType<Point>(assoc(__, 5, p)('x'));
expectType<Record<'x', string> & Omit<Point, 'x'>>(assoc(__, '5', p)('x'));
expectType<Point & Record<'z', number>>(assoc(__, 5, p)('z'));

expectType<Point>(assoc('x', __, p)(5));
expectType<Record<'x', string> & Omit<Point, 'x'>>(assoc('x', __, p)('5'));
expectType<Point & Record<'z', number>>(assoc('z', __, p)(5));

expectType<Point>(assoc('x', 5, p));
expectType<Record<'x', string> & Omit<Point, 'x'>>(assoc('x', '5', p));
expectType<Point & Record<'z', number>>(assoc('z', 5, p));

expectType<Record<'x', number> & Omit<Point, 'x'>>(assoc('x', 5)(p));
expectType<Record<'x', string> & Omit<Point, 'x'>>(assoc('x', '5')(p));
expectType<Record<'z', number> & Omit<Point, 'z'>>(assoc('z', 5)(p));

expectType<Record<'x', number> & Omit<Point, 'x'>>(assoc('x')(5, p));
expectType<Record<'x', number> & Omit<Point, 'x'>>(assoc('x')(5)(p));
