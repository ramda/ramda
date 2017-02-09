var _curry3 = require('./internal/_curry3');
var head = require('./head');
var isEmpty = require('./isEmpty');
var slice = require('./slice');
var tail = require('./tail');

/**
 * Takes a list of functions producing Tasks, a predicate and a value. Each function is
 * called with a value to produce Task which is chained to retrieve it's result.
 * Predicate is applied to that result and if results in true, anyPassT won't call next
 * Task producer function.
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Logic
 * @sig [(*... -> Task)] -> (* -> Boolean) -> [*] -> *
 * @param {Array} functionsList An array of Tasks producting functions
 * @param {Function} predicate Applied to each Task result to "short circut" the chain
 * @param {Array} arguments List of arguments to be applied to Tasks producting function
 * @return {Task} Task of truthful result(tested aginst predicate) or Task.of(false)
 * @example
 *
 *      var getUserById = anyPassT(
 *        [getUserFromCacheById, getUserFromDbById],
 *        R.is(Object),
 *      );
 *
 *      getUserById(15); // => {..} (from cache) || {..} (from cache) || false (user not found)
 */
module.exports = _curry3(function anyPassT(functionsList, predicate, arguments) {
  const nextFunction = head(functionsList);

  var task = nextFunction.apply(arguments);

  return task
    .chain(function(result) {
      if (predicate(result)) {
        return task.constructor.of(result);
      }

      if (isEmpty(slice(1, 2, functionsList))) {
        return task.constructor.of(false);
      }

      return anyPassT(tail(functionsList), predicate, arguments);
    });
});
