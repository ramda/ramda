import _curry2 from './internal/_curry2';


/**
 * Returns the first argument if truthy, otherwise the second argument.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Logic
 * @sig a -> b -> a | b
 * @param {Any} a
 * @param {Any} b
 * @return {Any} the first argument if truthy, otherwise the second argument.
 * @see R.either
 * @example
 *
 *      R.or(true, true); //=> true
 *      R.or(true, false); //=> true
 *      R.or(false, true); //=> true
 *      R.or(false, false); //=> false
 *      R.or('a', 'a') //=> 'a'
 *      R.or('a', '') //=> 'a'
 *      R.or('', 'a') //=> 'a'
 *      R.or('', '') //=> ''
 */
var or = _curry2(function or(a, b) {
  return a || b;
});
export default or;
