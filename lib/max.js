/**
 * Determines the largest of a list of numbers (or elements that can be cast to numbers)
 *
 * @func
 * @memberOf R
 * @category math
 * @sig [Number] -> Number
 * @see R.maxBy
 * @param {Array} list A list of numbers
 * @return {Number} The greatest number in the list.
 * @example
 *
 *      R.max([7, 3, 9, 2, 4, 9, 3]); //=> 9
 */
var max = R.max = _createMaxMin(gt, -Infinity);
