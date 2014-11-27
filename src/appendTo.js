var _append = require('./internal/_append');
var flip = require('./flip');


/**
 * Flipped version of R.append.
 *
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
module.exports = flip(_append);
