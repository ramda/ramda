var Z = require('sanctuary-type-classes');

var _curry1 = require('./internal/_curry1');
var multiply = require('./multiply');


/**
 * Multiplies together all the elements of a list.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig [Number] -> Number
 * @param {Array} list An array of numbers
 * @return {Number} The product of all the numbers in the list.
 * @see R.reduce
 * @example
 *
 *      R.product([2,4,6,8,100,1]); //=> 38400
 */
module.exports = _curry1(function product(xs) {
  return Z.reduce(multiply, 1, xs);
});
