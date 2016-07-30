var _arity = require('./internal/_arity');
var _curry2 = require('./internal/_curry2');


/**
 * Like `curry`, `curryStrong` returns a curried equivalent of the provided
 * function. Unlike `curry`, `curryStrong` takes a list of constraints, one
 * for each argument the function will take. When the function receives
 * arguments, its constraints are evaluated. If the constraints are not
 * satisfied, it will throw immediately.
 *
 * @func
 * @memberOf R
 * @category Function
 * @sig Number -> [Any -> Boolean] -> (Any... -> b) -> (Any -> ... -> b)
 * @param {Array} constraints Constraints on the function arguments.
 * @param {Function} fn The function to curry.
 * @return {Function} A new, curried function.
 * @see R.curry
 * @example
 *
 *      var plus = (a, b) => a + b;
 *      var nums = [R.is(Number), R.is(Number)];
 *      var strs = [R.is(String), R.is(String)];
 *
 *      var numPlus = R.curryStrong(nums, plus);
 *      numPlus(1, 2); //=> 3
 *      numPlus(1)(2); //=> 3
 *      // numPlus('1'); // throws TypeError
 *      // numPlus(1, '2'); // throws TypeError
 *      // numPlus(1)('2'); // throws TypeError
 *
 *      var strPlus = R.curryStrong(nums, plus);
 *      strPlus('1', '2'); //=> '12'
 *      strPlus('1')('2'); //=> '12'
 *      // strPlus(1); // throws TypeError
 *      // strPlus(1, '2'); // throws TypeError
 *      // strPlus('1')(2); // throws TypeError
 */
module.exports = (function() {
  function _curryStrong(constraints, received, fn) {
    return function() {
      var argsToGo;
      var argsLen = arguments.length;

      var i = 0;
      while (i < argsLen && i < constraints.length) {
        if (!constraints[i](arguments[i])) {
          throw new TypeError(constraints[i].message || 'Failed to satisfy type constraint, got ' + typeof arguments[i]);
        }
        received.push(arguments[i]);
        i += 1;
      }

      argsToGo = constraints.length - argsLen;
      return (argsToGo < 1) ?
        fn.apply(this, received) :
        _arity(argsToGo, _curryStrong(constraints.slice(argsLen), received, fn));
    };
  }

  return _curry2(function curryStrong(constraints, fn) {
    return _arity(constraints.length, _curryStrong(constraints, [], fn));
  });
}());


