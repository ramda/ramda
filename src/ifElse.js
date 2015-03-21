var _curry3 = require('./internal/_curry3');
var curryN = require('./curryN');


/**
 * Creates a function that will process either the `onTrue` or the `onFalse` function depending
 * upon the result of the `condition` predicate.
 *
 * @func
 * @memberOf R
 * @category Logic
 * @sig (*... -> Boolean) -> (*... -> *) -> (*... -> *) -> (*... -> *)
 * @param {Function} condition A predicate function
 * @param {Function} onTrue A function to invoke when the `condition` evaluates to a truthy value.
 * @param {Function} onFalse A function to invoke when the `condition` evaluates to a falsy value.
 * @return {Function} A new unary function that will process either the `onTrue` or the `onFalse`
 *                    function depending upon the result of the `condition` predicate.
 * @example
 *
 *      // Flatten all arrays in the list but leave other values alone.
 *      var flattenArrays = R.map(R.ifElse(Array.isArray, R.flatten, R.identity));
 *
 *      flattenArrays([[0], [[10], [8]], 1234, {}]); //=> [[0], [10, 8], 1234, {}]
 *      flattenArrays([[[10], 123], [8, [10]], "hello"]); //=> [[10, 123], [8, 10], "hello"]
 */
module.exports = _curry3(function ifElse(condition, onTrue, onFalse) {
  return curryN(Math.max(condition.length, onTrue.length, onFalse.length),
    function _ifElse() {
      return condition.apply(this, arguments) ? onTrue.apply(this, arguments) : onFalse.apply(this, arguments);
    }
  );
});
