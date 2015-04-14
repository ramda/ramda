var eq = require('./eq');
var uniqWith = require('./uniqWith');


/**
 * Returns a new list containing only one copy of each element in the original list.
 * Equality is strict here, meaning reference equality for objects and non-coercing equality
 * for primitives.
 *
 * @func
 * @memberOf R
 * @category List
 * @sig [a] -> [a]
 * @param {Array} list The array to consider.
 * @return {Array} The list of unique items.
 * @example
 *
 *      R.uniq([1, 1, 2, 1]); //=> [1, 2]
 *      R.uniq([{}, {}]);     //=> [{}, {}]
 *      R.uniq([1, '1']);     //=> [1, '1']
 */
module.exports = uniqWith(eq);
