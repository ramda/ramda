var _curry2 = require('./internal/_curry2');
var map = require('./map');
var repeat = require('./repeat');


/**
 * Returns a list of length `n` where each element is the result of evaluating `f()`.
 * If the function `f` has any side effects they will occur in order from left to right.
 * If `n` is `0` then `f` will not be executed and will have no side effects.
 *
 * @func
 * @memberOf R
 * @category List
 * @sig (* -> n) -> n -> [a]
 * @param {*} The function to be executed.
 * @param {Number} n The desired size of the output list.
 * @return {Array} A new array containing the values of `f()` from `n consecutive calls`.
 * @see R.repeat
 * @example
 *      var i = 0;
 *      R.repeatWith(() => i = i + 1, 5) //=> [1,2,3,4,5]
 *      //Note that the side effects occur in a left to right order.
 *
 */
module.exports = _curry2(function repeatWith(f, n) {
  return map(function(_e) {return f();}, repeat(null, n));
});
