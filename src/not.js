var _curry1 = require('./internal/_curry1');


/**
 * A function that returns the `!` of its argument. It will return `true` when
 * passed false-y value, and `false` when passed a truth-y one.
 *
 * @func
 * @memberOf R
 * @category Logic
 * @sig * -> Boolean
 * @param {*} a any value
 * @return {Boolean} the logical inverse of passed argument.
 * @example
 *
 *      R.and(false, true); //=> true
 *      R.and(0, []); //=> []
 *      R.and(null, ''); => false
 */
module.exports = _curry1(function not(a) {
  return !a;
});
