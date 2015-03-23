var _containsWith = require('./internal/_containsWith');
var _curry3 = require('./internal/_curry3');


/**
 * Returns `true` if the `x` is found in the `list`, using `pred` as an
 * equality predicate for `x`.
 *
 * @func
 * @memberOf R
 * @category List
 * @sig (a, a -> Boolean) -> a -> [a] -> Boolean
 * @param {Function} pred A predicate used to test whether two items are equal.
 * @param {*} x The item to find
 * @param {Array} list The list to iterate over
 * @return {Boolean} `true` if `x` is in `list`, else `false`.
 * @example
 *
 *      var xs = [{x: 12}, {x: 11}, {x: 10}];
 *      R.containsWith(function(a, b) { return a.x === b.x; }, {x: 10}, xs); //=> true
 *      R.containsWith(function(a, b) { return a.x === b.x; }, {x: 1}, xs); //=> false
 */
module.exports = _curry3(_containsWith);
