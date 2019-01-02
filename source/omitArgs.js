import _curry2 from './internal/_curry2';

/**
 * Wraps a function of any arity (including nullary) in a function additional
 * parameters that are omitted.
 *
 * @func
 * @memberOf R
 * @category Function
 * @sig Number -> (* -> a) -> (* -> a)
 * @param {Number} n The desired number of ignored parameters.
 * @param {Function} fn The function to wrap.
 * @return {Function} A new function wrapping `fn`.
 * @see R.nAry
 * @example
 *
 *      const takesTwoArgs = (a, b) => a + b;
 *
 *      takesTwoArgs(1, 2); //=> 3
 *
 *      const ignoresTwoArgs = R.omitArgs(2, takesTwoArgs);
 *
 *      // First `n` arguments are completely ignored
 *      ignoresTwoArgs(1, 2, 3, 4); //=> 7
 * @symb R.omitArgs(0, f)(a, b) = f(a, b)
 * @symb R.omitArgs(1, f)(a, b) = f(b)
 * @symb R.omitArgs(2, f)(a, b) = f()
 */
var omitArgs = _curry2(function omitArgs(n, fn) {
  if (n < 0) {
    throw new Error('First argument to omitArgs must be a non-negative integer');
  }
  return function () { fn.apply(this, Array.from(arguments).slice(n)) }
});

export default omitArgs;
