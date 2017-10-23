import _curry2 from './internal/_curry2';


/**
 * Returns the first argument if it is falsy, otherwise the second argument.
 * Compares two values with JavaScript `&&`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Logic
 * @sig a -> b -> a | b
 * @param {Any} a
 * @param {Any} b
 * @return {Any} the first argument if it is falsy, otherwise the second argument.
 * @see R.both, R.or
 * @example
 *
 *      R.and(true, true); //=> true
 *      R.and(true, false); //=> false
 *      R.and(false, true); //=> false
 *      R.and(false, false); //=> false
 *      R.and(0, 2);         //=> 0
 *      R.and(0, false);     //=> 0
 *      R.and(1, 2);         //=> 2
 *      R.and(1, false);     //=> false
 */
var and = _curry2(function and(a, b) {
  return a && b;
});
export default and;
