var _curry2 = require('./internal/_curry2');


/**
 * A function wrapping calls to the two functions in an `&&` operation, returning the result of the first
 * function if it is false-y and the result of the second function otherwise.  Note that this is
 * short-circuited, meaning that the second function will not be invoked if the first returns a false-y
 * value.
 *
 * @func
 * @memberOf R
 * @category Logic
 * @sig (*... -> Boolean) -> (*... -> Boolean) -> (*... -> Boolean)
 * @param {Function} f a predicate
 * @param {Function} g another predicate
 * @return {Function} a function that applies its arguments to `f` and `g` and `&&`s their outputs together.
 * @see R.and
 * @example
 *
 *      var gt10 = function(x) { return x > 10; };
 *      var even = function(x) { return x % 2 === 0 };
 *      var f = R.both(gt10, even);
 *      f(100); //=> true
 *      f(101); //=> false
 */
module.exports = _curry2(function both(f, g) {
  return function _both() {
    return f.apply(this, arguments) && g.apply(this, arguments);
  };
});
