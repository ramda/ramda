var _curry2 = require('./internal/_curry2');
var _slice = require('./internal/_slice');

/**
 * Returns a new list containing all but last the`n` elements of a given list,
 * passing each value from the right to the supplied predicate function, skipping
 * elements while the predicate function returns `true`. The predicate function
 * is passed one argument: (value)*.
 *
 * @func
 * @memberOf R
 * @category List
 * @sig (a -> Boolean) -> [a] -> [a]
 * @param {Function} fn The function called per iteration.
 * @param {Array} list The collection to iterate over.
 * @return {Array} A new array.
 * @see R.takeLastWhile
 * @example
 *
 *      var lteThree = function(x) {
 *        return x <= 3;
 *      };
 *
 *      R.dropLastWhile(lteThree, [1, 2, 3, 4, 3, 2, 1]); //=> [1, 2]
 */
module.exports = _curry2(function dropLastWhile(pred, list) {
  var idx = list.length - 1;
  while (idx >= 0 && pred(list[idx])) {
    idx -= 1;
  }
  return _slice(list, 0, idx + 1);
});
