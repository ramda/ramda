var Z = require('sanctuary-type-classes');

var _curry1 = require('./internal/_curry1');
var add = require('./add');


/**
 * Adds together all the elements of a list.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig [Number] -> Number
 * @param {Array} list An array of numbers
 * @return {Number} The sum of all the numbers in the list.
 * @see R.reduce
 * @example
 *
 *      R.sum([2,4,6,8,100,1]); //=> 121
 */
module.exports = _curry1(function sum(xs) {
  return Z.reduce(add, 0, xs);
});
