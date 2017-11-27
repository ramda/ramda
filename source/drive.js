var _curry2 = /*#__PURE__*/require('./internal/_curry2');
var reduce = /*#__PURE__*/require('./reduce');

/**
 * Accepts a value and a list of functions and returns the result of
 * passing the value to the leftmost function which its return value will
 * be passed to the next functions in the list.
 *
 * @fun
 * @memberOf R
 * @since v0.25.0
 * @category Function
 * @sig a -> [(a -> b), (b -> c) ,... (d -> e)] -> e
 * @param {*} x The value
 * @param {Array} functions A list of functions.
 * @return {*} The result of sequentially applying the list of function to appliying to `x`
 * @example
 *
 *      var add2MultBy3 = R.drive(R.__, [R.add(2), R.mult(3)]);
 *      add2MultBy3(2); //=> 12
 */

var drive = /*#__PURE__*/_curry2(function drive(x, fns) {
  return reduce(function(acc, f) {
    return f(acc);
  }, x, fns);
});
module.exports = drive;