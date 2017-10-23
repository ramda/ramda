import _curry2 from './internal/_curry2';


/**
 * Returns the first argument if it is truthy, otherwise the second argument.
 * Compares two values with JavaScript `||`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Logic
 * @sig a -> b -> a | b
 * @param {Any} a
 * @param {Any} b
 * @return {Any} the first argument if truthy, otherwise the second argument.
 * @see R.either, R.and
 * @example
 *
 *      R.or(true, true);   //=> true
 *      R.or(true, false);  //=> true
 *      R.or(false, true);  //=> true
 *      R.or(false, false); //=> false
 *      R.or(0, 2);         //=> 2
 *      R.or(0, false);     //=> false
 *      R.or(1, 2);         //=> 1
 *      R.or(1, false);     //=> 1
 *
 */
var or = _curry2(function or(a, b) {
  return a || b;
});
export default or;
