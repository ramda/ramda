var _contains = require('./internal/_contains');
var op = require('./op');


/**
 * Returns `true` if the specified item is somewhere in the list, `false` otherwise.
 * Equivalent to `indexOf(a)(list) > -1`. Uses strict (`===`) equality checking.
 *
 * @func
 * @memberOf R
 * @category List
 * @sig a -> [a] -> Boolean
 * @param {Object} a The item to compare against.
 * @param {Array} list The array to consider.
 * @return {Boolean} `true` if the item is in the list, `false` otherwise.
 * @note Operator: Since this is a non-commutative infix operator converted to prefix, it can
 *       be curried right by explicitly passing `R.__` for its first argument.
 *
 * @example
 *
 *      R.contains(3)([1, 2, 3]); //=> true
 *      R.contains(4)([1, 2, 3]); //=> false
 *      R.contains({})([{}, {}]); //=> false
 *      var obj = {};
 *      R.contains(obj)([{}, obj, {}]); //=> true
 *
 *      // operator-style
 *      R.contains(R.__)([1, 2, 3], 3) //=> true
 *
 */
module.exports = op(_contains);
