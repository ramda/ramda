var _curry2 = require('./internal/_curry2');
var _dispatchable = require('./internal/_dispatchable');
var _slice = require('./internal/_slice');
var _xtakeWhile = require('./internal/_xtakeWhile');


/**
 * Returns a new list containing the first `n` elements of a given list, passing each value
 * to the supplied predicate function, and terminating when the predicate function returns
 * `false`. Excludes the element that caused the predicate function to fail. The predicate
 * function is passed one argument: *(value)*.
 *
 * Acts as a transducer if a transformer is given in list position.
 * @see R.transduce
 *
 * @func
 * @memberOf R
 * @category List
 * @sig (a -> Boolean) -> [a] -> [a]
 * @param {Function} fn The function called per iteration.
 * @param {Array} list The collection to iterate over.
 * @return {Array} A new array.
 * @see R.dropWhile
 * @example
 *
 *      var isNotFour = function(x) {
 *        return !(x === 4);
 *      };
 *
 *      R.takeWhile(isNotFour, [1, 2, 3, 4]); //=> [1, 2, 3]
 */
module.exports = _curry2(_dispatchable('takeWhile', _xtakeWhile, function takeWhile(fn, list) {
  var idx = 0, len = list.length;
  while (idx < len && fn(list[idx])) {
    idx += 1;
  }
  return _slice(list, 0, idx);
}));
