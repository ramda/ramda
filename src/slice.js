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
 *      var xs = R.range(0, 10);
 *      R.slice(2, 5)(xs); //=> [2, 3, 4]
 */
module.exports = invoker(2, 'slice');
