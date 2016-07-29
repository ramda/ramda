var _curry2 = require('./internal/_curry2');
var _isPlaceholder = require('./internal/_isPlaceholder');
var curryN = require('./curryN');
var reject = require('./reject');


/**
 * Takes a function `f` and a list of arguments, and returns a function `g`.
 * When applied, `g` returns the result of applying `f` to the arguments
 * provided initially followed by the arguments provided to `g`.
 *
 * `partial` also accepts the special placeholder value, `R.__`, used to
 * specify "gaps" within the arguments.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category Function
 * @sig ((a, b, c, ..., n) -> x) -> [a, b, c, ...] -> ((d, e, f, ..., n) -> x)
 * @param {Function} f
 * @param {Array} args
 * @return {Function}
 * @see R.partialRight
 * @example
 *
 *      var multiply = (a, b) => a * b;
 *      var double = R.partial(multiply, [2]);
 *      double(2); //=> 4
 *
 *      var half = R.partial(R.divide, [R.__, 2]);
 *      half(42); //=> 21
 */
module.exports = _curry2(function partial(fn, partialArgs) {
  var numActual = reject(_isPlaceholder, partialArgs).length;
  var numRemaining = Math.max(0, fn.length - numActual);
  return curryN(numRemaining, function() {
    var combined = [];
    var aidx = 0;
    var pidx = 0;
    while (pidx < partialArgs.length) {
      var arg = partialArgs[pidx];
      if (_isPlaceholder(arg)) {
        if (aidx < arguments.length) {
          combined.push(arguments[aidx]);
          aidx += 1;
        }
      } else {
        combined.push(arg);
      }
      pidx += 1;
    }
    while (aidx < arguments.length) {
      combined.push(arguments[aidx]);
      aidx += 1;
    }
    return fn.apply(this, combined);
  });
});
