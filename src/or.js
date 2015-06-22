var _curry2 = require('./internal/_curry2');


/**
 * A function that returns `true` if one or both of its arguments are strictly
 * equal to `true` argument.
 *
 * @func
 * @memberOf R
 * @category Logic
 * @sig Boolean -> Boolean -> Boolean
 * @param {Boolean} a A boolean value
 * @param {Boolean} b A boolean value
 * @return {Boolean} `true` if one or both arguments are `true`, `false` otherwise
 * @example
 *
 *      R.or(true, true); //=> true
 *      R.or(true, false); //=> true
 *      R.or(false, true); //=> true
 *      R.or(false, false); //=> false
 */
module.exports = _curry2(function or(a, b) {
  return a === true || b === true;
});
