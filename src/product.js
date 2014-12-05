var _multiply = require('./internal/_multiply');
var foldl = require('./foldl');


/**
 * Multiplies together all the elements of a list.
 *
 * @func
 * @memberOf R
 * @category Math
 * @sig [Number] -> Number
 * @param {Array} list An array of numbers
 * @return {Number} The product of all the numbers in the list.
 * @see foldl
 * @example
 *
 *      R.product([2,4,6,8,100,1]); //=> 38400
 */
module.exports = foldl(_multiply, 1);
