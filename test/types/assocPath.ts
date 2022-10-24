import * as _ from 'ts-toolbelt';
import { expectAssignable, expectType } from 'tsd';
import { __, assocPath } from '../../es/index';

type Obj = {
  v: string;
  a: {
    v: number;
    b: {
      v: string;
      c: {
        v: number;
        d: {
          v: string;
          e: {
            v: number;
            f: {
              v: string;
            }
          }
        }
      }
    }
  }
};

const obj: Obj = {
  v: '1',
  a: {
    v: 2,
    b: {
      v: '3',
      c: {
        v: 4,
        d: {
          v: '5',
          e: {
            v: 6,
            f: {
              v: '7'
            }
          }
        }
      }
    }
  }
};

// each group of 3 is
// * path known, same type
// * path known, different type
// * path unknown

// assocPath(__, val, obj)(path)
// path length = 1
expectType<Obj>(assocPath(__, '0', obj)(['v']));
expectAssignable<_.O.P.Update<Obj, ['v'], number>>(assocPath(__, 0, obj)(['v']));
expectAssignable<_.O.P.Update<Obj, ['x'], string>>(assocPath(__, '0', obj)(['x']));
// path length = 2
expectType<Obj>(assocPath(__, 0, obj)(['a', 'v']));
expectAssignable<_.O.P.Update<Obj, ['a', 'v'], string>>(assocPath(__, '0', obj)(['a', 'v']));
expectAssignable<_.O.P.Update<Obj, ['a', 'x'], number>>(assocPath(__, 0, obj)(['a', 'x']));
// length = 3
expectType<Obj>(assocPath(__, '0', obj)(['a', 'b', 'v']));
expectAssignable<_.O.P.Update<Obj, ['a', 'b', 'v'], number>>(assocPath(__, 0, obj)(['a', 'b', 'v']));
expectAssignable<_.O.P.Update<Obj, ['a', 'b', 'x'], string>>(assocPath(__, '0', obj)(['a', 'b', 'x']));
// length = 3
expectType<Obj>(assocPath(__, 0, obj)(['a', 'b', 'c', 'v']));
expectAssignable<_.O.P.Update<Obj, ['a', 'b', 'c', 'v'], string>>(assocPath(__, '0', obj)(['a', 'b', 'c', 'v']));
expectAssignable<_.O.P.Update<Obj, ['a', 'b', 'c', 'x'], number>>(assocPath(__, 0, obj)(['a', 'b', 'c', 'x']));
// length = 4
// TODO, finish

// TODO, rest of assocPath(__, obj)(path)

// assocPath(path, __, obj)(val)
// length = 1
expectType<Obj>(assocPath(['v'], __, obj)('1'));
expectType<_.O.P.Update<Obj, ['v'], number>>(assocPath(['v'], __, obj)(1));
expectType<_.O.P.Update<Obj, ['x'], string>>(assocPath(['x'], __, obj)('1'));
// TODO, finish

// assocPath(path, val, obj)
expectType<Obj>(assocPath(['v'], '1', obj));
expectType<_.O.P.Update<Obj, ['v'], number>>(assocPath(['v'], 1, obj));
expectType<_.O.P.Update<Obj, ['x'], string>>(assocPath(['x'], '1', obj));
