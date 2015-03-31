var _contains = require('./internal/_contains');
var _curry2 = require('./internal/_curry2');


/**
 * Returns `true` if the specified item is somewhere in the list, `false` otherwise.
 * Equivalent to `indexOf(a, list) >= 0`.
 *
 * Has `Object.is` semantics: `NaN` is considered equal to `NaN`; `0` and `-0`
 * are not considered equal.
 *
 * @func
 * @memberOf R
 * @category List
 * @sig a -> [a] -> Boolean
 * @param {Object} a The item to compare against.
 * @param {Array} list The array to consider.
 * @return {Boolean} `true` if the item is in the list, `false` otherwise.
 *
 * @example
 *
 *      R.contains(3)([1, 2, 3]); //=> true
 *      R.contains(4)([1, 2, 3]); //=> false
 *      R.contains({})([{}, {}]); //=> false
 *      var obj = {};
 *      R.contains(obj)([{}, obj, {}]); //=> true
 */
module.exports = _curry2(_contains);
