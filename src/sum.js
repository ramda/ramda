var add = require('./add');
var reduce = require('./reduce');


/**
 * 对数组中所有元素求和。
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category Math
 * @sig [Number] -> Number
 * @param {Array} list 数的数组
 * @return {Number} 数组中所有数的和
 * @see R.reduce
 * @example
 *
 *      R.sum([2,4,6,8,100,1]); //=> 121
 */
module.exports = reduce(add, 0);
