var _curry2 = require('./internal/_curry2');


/**
 * Adds two numbers. Equivalent to `a + b` but curried.
 *
 * @func
 * @memberOf R
 * @category Math
 * @sig Number -> Number -> Number
 * @param {Number} a
 * @param {Number} b
 * @return {Number}
 * @see R.subtract
 * @example
 *
 *      R.add(2, 3);       //=>  5
 *      R.add(7)(10);      //=> 17
 */
module.exports = _curry2(function add(a, b) { return a + b; });
