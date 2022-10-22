import { expectType } from "tsd";
import { __, path } from "../../es/index";

const obj: {
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
} = {
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

expectType<string>(path(['v'], obj));
expectType<string>(path(['v'])(obj));
expectType<string>(path<typeof obj, 'v'>(['v'])(obj));
expectType<unknown>(path(__, obj)(['v']));

expectType<number>(path(['a', 'v'], obj));
expectType<number>(path(['a', 'v'])(obj));
expectType<number>(path<typeof obj, 'a', 'v'>(['a', 'v'])(obj));
expectType<number>(path(__, obj)(['a', 'v']));

expectType<string>(path(['a', 'b', 'v'], obj));
expectType<string>(path(['a', 'b', 'v'])(obj));
expectType<string>(path<typeof obj, 'a', 'b', 'v'>(['a', 'b', 'v'])(obj));
expectType<string>(path(__, obj)(['a', 'b', 'v']));

expectType<number>(path(['a', 'b', 'c', 'v'], obj));
expectType<number>(path(['a', 'b', 'c', 'v'])(obj));
expectType<number>(path<typeof obj, 'a', 'b', 'c', 'v'>(['a', 'b', 'c', 'v'])(obj));
expectType<number>(path(__, obj)(['a', 'b', 'c', 'v']));

expectType<string>(path(['a', 'b', 'c', 'd', 'v'], obj));
expectType<string>(path(['a', 'b', 'c', 'd', 'v'])(obj));
expectType<string>(path<typeof obj, 'a', 'b', 'c', 'd', 'v'>(['a', 'b', 'c', 'd', 'v'])(obj));
expectType<string>(path(__, obj)(['a', 'b', 'c', 'd', 'v']));

expectType<number>(path(['a', 'b', 'c', 'd', 'e', 'v'], obj));
expectType<number>(path(['a', 'b', 'c', 'd', 'e', 'v'])(obj));
expectType<number>(path<typeof obj, 'a', 'b', 'c', 'd', 'e', 'v'>(['a', 'b', 'c', 'd', 'e', 'v'])(obj));
expectType<number>(path(__, obj)(['a', 'b', 'c', 'd', 'e', 'v']));

// past 7 type is unknown assumed to be the type passed to the generic
const rtn = path(['a', 'b', 'c', 'd', 'e', 'f', 'v'], obj);
expectType<unknown>(rtn);
// when the generic is set, this is to show that the return is <T | undefined>,
// but cannot enforce that the actually type of the path for the given object matches
const rtnAssumed = path<Function>(['a', 'b', 'c', 'd', 'e', 'f', 'v'], obj);
expectType<Function | undefined>(rtnAssumed);
