var _curry1 = require('./internal/_curry1');
var _multiply = require('./internal/_multiply');
var reduce = require('./reduce');


/**
 * Multiplies together all the elements of a list.
 *
 * @func
 * @memberOf R
 * @category Math
 * @sig [Number] -> Number
 * @param {Array} list An array of numbers
 * @return {Number} The product of all the numbers in the list.
 * @see reduce
 * @example
 *
 *      R.product([2,4,6,8,100,1]); //=> 38400
 */
module.exports = _curry1(reduce(_multiply, 1));
