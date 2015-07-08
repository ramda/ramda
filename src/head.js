var nth = require('./nth');


/**
 * Returns the first element in a list.
 * In some libraries this function is named `first`.
 *
 * @func
 * @memberOf R
 * @category List
 * @see R.tail, R.init, R.last
 * @sig [a] -> a | Undefined
 * @param {Array} list The array to consider.
 * @return {*} The first element of the list, or `undefined` if the list is empty.
 * @example
 *
 *      R.head(['fi', 'fo', 'fum']); //=> 'fi'
 *      R.head([]); //=> undefined
 */
module.exports = nth(0);
