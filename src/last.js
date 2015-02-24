var _curry1 = require('./internal/_curry1');
var nth = require('./nth');


/**
 * Returns the last element from a list.
 *
 * @func
 * @memberOf R
 * @category List
 * @sig [a] -> a
 * @param {Array} list The array to consider.
 * @return {*} The last element of the list, or `undefined` if the list is empty.
 * @example
 *
 *      R.last(['fi', 'fo', 'fum']); //=> 'fum'
 */
module.exports = _curry1(nth(-1));
