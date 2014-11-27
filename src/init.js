var slice = require('./slice');


/**
 * Returns all but the last element of a list.
 *
 * @func
 * @memberOf R
 * @category List
 * @sig [a] -> [a]
 * @param {Array} [list=[]] The array to consider.
 * @return {Array} A new array containing all but the last element of the input list, or an
 *         empty list if the input list is empty.
 * @example
 *
 *      R.init(['fi', 'fo', 'fum']); //=> ['fi', 'fo']
 */
module.exports = slice(0, -1);
