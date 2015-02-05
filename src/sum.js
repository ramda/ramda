var _add = require('./internal/_add');
var reduce = require('./reduce');


/**
 * Adds together all the elements of a list.
 *
 * @func
 * @memberOf R
 * @category Math
 * @sig [Number] -> Number
 * @param {Array} list An array of numbers
 * @return {Number} The sum of all the numbers in the list.
 * @see reduce
 * @example
 *
 *      R.sum([2,4,6,8,100,1]); //=> 121
 */
module.exports = reduce(_add, 0);
