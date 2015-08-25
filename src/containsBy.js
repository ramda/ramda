var _curry3 = require('./internal/_curry3');
var any = require('./any');
var compose = require('./compose');
var equals = require('./equals');


/**
 * Returns `true` if `f(x)` is equal, in `R.equals` terms, to one or more
 * of the elements of `R.map(f, xs)`; `false` otherwise.
 *
 * Short-circuits as soon as a match is found.
 *
 * @func
 * @memberOf R
 * @category List
 * @sig (a -> b) -> a -> [a] -> Boolean
 * @param {Function} f
 * @param {*} x
 * @param {Array} xs
 * @return {Boolean}
 * @example
 *
 *      R.containsBy(Math.abs, 5, [1, 2, 3]); //=> false
 *      R.containsBy(Math.abs, 5, [4, 5, 6]); //=> true
 *      R.containsBy(Math.abs, 5, [-1, -2, -3]); //=> false
 *      R.containsBy(Math.abs, 5, [-4, -5, -6]); //=> true
 */
module.exports = _curry3(function containsBy(f, x, xs) {
  return any(compose(equals(f(x)), f), xs);
});
