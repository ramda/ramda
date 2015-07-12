var _curry2 = require('./internal/_curry2');


/**
 * A function that returns `true` only if both its arguments are strictly equal
 * to `true`.
 *
 * @func
 * @memberOf R
 * @category Logic
 * @sig Boolean -> Boolean -> Boolean
 * @param {Boolean} a A boolean value
 * @param {Boolean} b A boolean value
 * @return {Boolean} `true` if both arguments are `true`, `false` otherwise
 * @example
 *
 *      R.and(true, true); //=> true
 *      R.and(true, false); //=> false
 *      R.and(false, true); //=> false
 *      R.and(false, false); //=> false
 */
module.exports = _curry2(function and(a, b) {
  return a === true && b === true;
});
