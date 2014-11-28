var _makeFlat = require('./_makeFlat');


/**
 * Returns a new list by pulling every item at the first level of nesting out, and putting
 * them in a new array.
 *
 * @func
 * @memberOf R
 * @category List
 * @sig [a] -> [b]
 * @param {Array} list The array to consider.
 * @return {Array} The flattened list.
 * @example
 *
 *      R.unnest([1, [2], [[3]]]); //=> [1, 2, [3]]
 *      R.unnest([[1, 2], [3, 4], [5, 6]]); //=> [1, 2, 3, 4, 5, 6]
 */
module.exports = _makeFlat(false);
