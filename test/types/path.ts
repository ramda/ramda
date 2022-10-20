import { expectType } from "tsd";
import { path } from "../../es/index";

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
expectType<string>(path<typeof obj, 'v'>(['v'])(obj));
expectType<string>(path(['v'])(obj));


// expectType<number>(path(['a', 'v'], obj));
// expectType<string>(path(['a', 'b', 'v'], obj));
// expectType<number>(path(['a', 'b', 'c', 'v'], obj));
// expectType<string>(path(['a', 'b', 'c', 'd', 'v'], obj));
// expectType<number>(path(['a', 'b', 'c', 'd', 'e', 'v'], obj));
// past 7 type is unknown assumed to be the type passed to the generic
const rtn = path(['a', 'b', 'c', 'd', 'e', 'f', 'v'], obj);
expectType<unknown>(rtn);
const rtnAssumed = path<Function>(['a', 'b', 'c', 'd', 'e', 'f', 'v'], obj);
expectType<Function | undefined>(rtnAssumed);
