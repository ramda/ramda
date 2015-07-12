var _curry3 = require('./internal/_curry3');


/**
 * Takes a function and two values, and returns whichever value produces
 * the larger result when passed to the provided function.
 *
 * @func
 * @memberOf R
 * @category Relation
 * @sig Ord b => (a -> b) -> a -> a -> a
 * @param {Function} f
 * @param {*} a
 * @param {*} b
 * @return {*}
 * @see R.max, R.minBy
 * @example
 *
 *      R.maxBy(function(n) { return n * n; }, -3, 2); //=> -3
 */
module.exports = _curry3(function maxBy(f, a, b) {
  return f(b) > f(a) ? b : a;
});
