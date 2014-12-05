var _curry3 = require('./internal/_curry3');


/**
 * Creates a function that will process either the `onTrue` or the `onFalse` function depending
 * upon the result of the `condition` predicate.
 *
 * @func
 * @memberOf R
 * @category Logic
 * @sig (*... -> Boolean) -> (*... -> *) -> (*... -> *) -> (*... -> *)
 * @param {Function} condition A condition function
 * @param {Function} onTrue A predicate to invoke when the condition evaluates to a truthy value
 * @param {Function} onFalse A predicate to invoke when the condition evaluates to a falsy value
 * @return {Function} A function that validates the arguments before executing "truthy"
 *         predicate or the the "falsey" predicate.
 * @example
 *
 *      // Flatten all arrays in the list and return whatever is not an array
 *      var flattenArrays = R.map(R.ifElse(Array.isArray, R.flatten, R.identity));
 *
 *      flattenArrays([[0], [[10], [8]], 1234, {}]); //=> [[0], [10, 8], 1234, {}]
 *      flattenArrays([[[10], 123], [8, [10]], "hello"]); //=> [[10, 123], [8, 10], "hello"]
 */
module.exports = _curry3(function ifElse(condition, onTrue, onFalse) {
    return function _ifElse() {
        return condition.apply(this, arguments) ? onTrue.apply(this, arguments) : onFalse.apply(this, arguments);
    };
});
