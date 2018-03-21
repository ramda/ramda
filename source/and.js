import _curry2 from './internal/_curry2';


/**
 * Returns the first argument if it is falsy, otherwise the second argument.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Logic
 * @sig a -> b -> a | b
 * @param {Any} a
 * @param {Any} b
 * @return {Any} the first argument if it is falsy, otherwise the second argument.
 * @see R.both
 * @example
 *
 *      R.and(true, true); //=> true
 *      R.and(true, false); //=> false
 *      R.and(false, true); //=> false
 *      R.and(false, false); //=> false
 *      R.and('a', 'a') //=> 'a'
 *      R.and('a', '') //=> ''
 *      R.and('', 'a') //=> ''
 *      R.and('', '') //=> ''
 */
var and = _curry2(function and(a, b) {
  return a && b;
});
export default and;
