var nth = require('./nth');


/**
 * Returns the last element from a list.
 *
 * @func
 * @memberOf R
 * @category List
 * @sig [a] -> a | Undefined
 * @param {Array} list The array to consider.
 * @return {*} The last element of the list, or `undefined` if the list is empty.
 * @example
 *
 *      R.last(['fi', 'fo', 'fum']); //=> 'fum'
 *      R.last([]); //=> undefined
 */
module.exports = nth(-1);
