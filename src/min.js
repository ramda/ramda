var _createMaxMin = require('./internal/_createMaxMin');
var _lt = require('./internal/_lt');


/**
 * Determines the smallest of a list of numbers (or elements that can be cast to numbers)
 *
 * @func
 * @memberOf R
 * @category Math
 * @sig [Number] -> Number
 * @param {Array} list A list of numbers
 * @return {Number} The greatest number in the list.
 * @see R.minBy
 * @example
 *
 *      R.min([7, 3, 9, 2, 4, 9, 3]); //=> 2
 */
module.exports = _createMaxMin(_lt, Infinity);
