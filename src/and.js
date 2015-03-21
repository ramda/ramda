var _curry2 = require('./internal/_curry2');

/**
 * A function that returns the first argument if it's falsy otherwise the second
 * argument. Note that this is NOT short-circuited, meaning that if expressions
 * are passed they are both evaluated.
 *
 * @func
 * @memberOf R
 * @category Logic
 * @sig * -> * -> *
 * @param {*} a any value
 * @param {*} b any other value
 * @return {*} the first argument if falsy otherwise the second argument.
 * @example
 *
 *      R.and(false, true); //=> true
 *      R.and(0, []); //=> []
 *      R.and(null, ''); => false
 */
module.exports = _curry2(function and(a, b) {
  return a && b;
});
