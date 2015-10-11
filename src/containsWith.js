var _containsWith = require('./internal/_containsWith');
var _curry3 = require('./internal/_curry3');


/**
 * Returns `true` if the `x` is found in the `list`, using `pred` as an
 * equality predicate for `x`.
 *
 * @func
 * @memberOf R
 * @since v0.1.5
 * @category List
 * @sig (a, a -> Boolean) -> a -> [a] -> Boolean
 * @param {Function} pred A predicate used to test whether two items are equal.
 * @param {*} x The item to find
 * @param {Array} list The list to iterate over
 * @return {Boolean} `true` if `x` is in `list`, else `false`.
 * @deprecated since v0.18.0
 * @example
 *
 *      var absEq = (a, b) => Math.abs(a) === Math.abs(b);
 *      R.containsWith(absEq, 5, [1, 2, 3]); //=> false
 *      R.containsWith(absEq, 5, [4, 5, 6]); //=> true
 *      R.containsWith(absEq, 5, [-1, -2, -3]); //=> false
 *      R.containsWith(absEq, 5, [-4, -5, -6]); //=> true
 */
module.exports = _curry3(_containsWith);
