import { expectType, expectNotType } from "tsd";
import * as R from "../../es/index";

expectType<true>(R.isNotNil(1));
expectType<true>(R.isNotNil("a"));
expectType<true>(R.isNotNil(true));
expectType<false>(R.isNotNil(null));
expectType<false>(R.isNotNil(undefined));

expectNotType<false>(R.isNotNil(1));
expectNotType<false>(R.isNotNil("a"));
expectNotType<false>(R.isNotNil(true));
expectNotType<true>(R.isNotNil(null));
expectNotType<true>(R.isNotNil(undefined));
