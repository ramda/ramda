var _appendTo = require('./internal/_appendTo');
var _curry2 = require('./internal/_curry2');


/**
 * Flipped version of R.append.
 *
 * @deprecated since v0.11.0
 * @func
 * @memberOf R
 * @category List
 * @sig [a] -> a -> [a]
 * @param {Array} list
 * @param {*} el
 * @return {Array}
 * @example
 *
 *      R.appendTo([], 1); //=> [1]
 *      R.appendTo([1, 2, 3], 4); //=> [1, 2, 3, 4]
 *      R.appendTo([1, 2, 3], [4, 5, 6]); //=> [1, 2, 3, [4, 5, 6]]
 */
module.exports = _curry2(_appendTo);
