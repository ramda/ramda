import _xReduce from './internal/_xReduce.js';
import _xwrap from './internal/_xwrap.js';
import curryN from './curryN.js';


/**
 * Initializes a transducer using supplied iterator function. Returns a single
 * item by iterating through the list, successively calling the transformed
 * iterator function and passing it an accumulator value and the current value
 * from the array, and then passing the result to the next call.
 *
 * The iterator function receives two values: *(acc, value)*. It will be
 * wrapped as a transformer to initialize the transducer. A transformer can be
 * passed directly in place of an iterator function. In both cases, iteration
 * may be stopped early with the [`R.reduced`](#reduced) function.
 *
 * A transducer is a function that accepts a transformer and returns a
 * transformer and can be composed directly. Partially applied functions such
 * as `R.map(f)` and `R.filter(pred)` can be used as transducers.
 *
 * A transformer is an object that provides three methods:
 *
 * - `@@transducer/step`: a 2-arity reducing iterator function.
 * - `@@transducer/init`: a 0-arity initial value function.
 * - `@@transducer/result`: a 1-arity result extraction function.
 *
 * `@@transducer/step` receives the accumulator and each input value.
 * `@@transducer/result` converts the final accumulator into the return value
 * and is often [`R.identity`](#identity). `transduce` does not call
 * `@@transducer/init`; it uses the `acc` argument as the initial accumulator.
 *
 * The iteration is performed with [`R.reduce`](#reduce) after initializing the transducer.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category List
 * @sig (c -> c) -> ((a, b) -> a) -> a -> [b] -> a
 * @param {Function} xf The transducer function. Receives a transformer and returns a transformer.
 * @param {Function|Object} fn The iterator function or transformer object. Iterator functions
 *        receive the accumulator and current element from the array, and are wrapped as
 *        transformers to initialize the transducer.
 * @param {*} acc The initial accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {*} The final, accumulated value.
 * @see R.reduce, R.reduced, R.into
 * @example
 *
 *      const numbers = [1, 2, 3, 4];
 *      const transducer = R.compose(R.map(R.add(1)), R.take(2));
 *      R.transduce(transducer, R.flip(R.append), [], numbers); //=> [2, 3]
 *
 *      const isOdd = (x) => x % 2 !== 0;
 *      const firstOddTransducer = R.compose(R.filter(isOdd), R.take(1));
 *      R.transduce(firstOddTransducer, R.flip(R.append), [], R.range(0, 100)); //=> [1]
 *
 *      const sumTransformer = {
 *        '@@transducer/init': R.always(0),
 *        '@@transducer/step': R.add,
 *        '@@transducer/result': R.identity
 *      };
 *      // Uses 10 as the initial accumulator, rather than calling init.
 *      R.transduce(R.map(R.add(1)), sumTransformer, 10, numbers); //=> 24
 */
var transduce = curryN(4, function transduce(xf, fn, acc, list) {
  return _xReduce(xf(typeof fn === 'function' ? _xwrap(fn) : fn), acc, list);
});
export default transduce;
