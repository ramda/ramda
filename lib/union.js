var _concat = require('./_concat');
var compose = require('./compose');
var uniq = require('./uniq');


/**
 * Combines two lists into a set (i.e. no duplicates) composed of the
 * elements of each list.
 *
 * @func
 * @memberOf R
 * @category relation
 * @sig [a] -> [a] -> [a]
 * @param {Array} as The first list.
 * @param {Array} bs The second list.
 * @return {Array} The first and second lists concatenated, with
 *         duplicates removed.
 * @example
 *
 *      R.union([1, 2, 3], [2, 3, 4]); //=> [1, 2, 3, 4]
 */
module.exports = compose(uniq, _concat);
