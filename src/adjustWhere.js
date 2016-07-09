var _curry3 = require('./internal/_curry3');


/**
 * Applies a function to the value at the index of an array where the given
 * condition is true, returning a new copy of the array with the element
 * replaced with the result of the function application.
 *
 * @func
 * @memberOf R
 * @category List
 * @sig (a -> a) -> (a -> Boolean) -> [a] -> [a]
 * @param {Function} adj The function to apply.
 * @param {Function} pred The predicate function.
 * @param {Array|Arguments} list An array-like object whose value
 *        where the predicate is true will be replaced.
 * @return {Array} A copy of the supplied array-like object with
 *         the element where the predicate is true is replaced with the value
 *         returned by applying `adj` to the existing element.
 * @see R.adjust
 * @example
 *
 *      R.adjustWhere(R.add(1), R.equals(1), [0, 1, 1]);    //=> [0, 2, 2]
 *      R.adjustWhere(R.add(1))(R.equals(1))([0, 1, 1]);    //=> [0, 2, 2]
 */
module.exports = _curry3(function adjust(adj, pred, list) {
  return list.map(function(item) {
    return pred(item) ? adj(item) : item;
  });
});
