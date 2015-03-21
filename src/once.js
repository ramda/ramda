var _curry1 = require('./internal/_curry1');


/**
 * Accepts a function `fn` and returns a function that guards invocation of `fn` such that
 * `fn` can only ever be called once, no matter how many times the returned function is
 * invoked.
 *
 * @func
 * @memberOf R
 * @category Function
 * @sig (a... -> b) -> (a... -> b)
 * @param {Function} fn The function to wrap in a call-only-once wrapper.
 * @return {Function} The wrapped function.
 * @example
 *
 *      var addOneOnce = R.once(function(x){ return x + 1; });
 *      addOneOnce(10); //=> 11
 *      addOneOnce(addOneOnce(50)); //=> 11
 */
module.exports = _curry1(function once(fn) {
  var called = false, result;
  return function() {
    if (called) {
      return result;
    }
    called = true;
    result = fn.apply(this, arguments);
    return result;
  };
});
