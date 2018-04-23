import pipeWith from './pipeWith';
import reverse from './reverse';


/**
 * Performs right-to-left function composition using transforming function. The rightmost function may have
 * any arity; the remaining functions must be unary.
 *
 * **Note:** The result of compose is not automatically curried.
 *
 * @func
 * @memberOf R
 * @category Function
 * @sig ((y -> z), (x -> y), ..., (o -> p), ((a, b, ..., n) -> o)) -> ((a, b, ..., n) -> z)
 * @param {...Function} ...functions The functions to compose
 * @return {Function}
 * @see R.compose, R.pipeWith
 * @example
 *
 *      const composeWhileNotNil = R.composeWith((f, res) => R.isNil(res) ? res : f(res));
 *
 *      composeWhileNotNil(R.inc, R.prop('age'))({age: 1}) //=> 2
 *      composeWhileNotNil(R.inc, R.prop('age'))({}) //=> null
 *
 * @symb R.composeWith(f)(g, h, i)(...args) = f(g, f(h, f(i, ...args)))
 */
export default function composeWith() {
  if (arguments.length !== 1) {
    throw new Error('composeWith requires exactly one transforming function');
  }

  var trasformFn = arguments[0];

  return function() {
    var pipeWithFn = pipeWith.call(this, trasformFn);
    return pipeWithFn.apply(this, reverse(arguments));
  };
}
