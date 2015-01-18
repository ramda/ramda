var invoker = require('./invoker');


/**
 * Returns the elements from `xs` starting at `a` and ending at `b - 1`.
 *
 * @func
 * @memberOf R
 * @category List
 * @sig Number -> Number -> [a] -> [a]
 * @param {Number} a The starting index.
 * @param {Number} b One more than the ending index.
 * @param {Array} xs The list to take elements from.
 * @return {Array} The items from `a` to `b - 1` from `xs`.
 * @example
 *
 *      > R.slice(2, 5, ['a', 'b', 'c', 'd', 'e', 'f'])
 *      ['c', 'd', 'e']
 */
module.exports = invoker(2, 'slice');
