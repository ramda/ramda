var _complement = require('./internal/_complement');
var _curry2 = require('./internal/_curry2');
var filter = require('./filter');


/**
 * Similar to `filter`, except that it keeps only values for which the given predicate
 * function returns falsy. The predicate function is passed one argument: *(value)*.
 *
 * Acts as a transducer if a transformer is given in list position.
 * @see R.transduce
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig (a -> Boolean) -> [a] -> [a]
 * @param {Function} fn The function called per iteration.
 * @param {Array} list The collection to iterate over.
 * @return {Array} The new filtered array.
 * @see R.filter
 * @example
 *
 *      var isOdd = (n) => n % 2 === 1;
 *
 *      R.reject(isOdd, [1, 2, 3, 4]); //=> [2, 4]
 */
module.exports = _curry2(function reject(fn, list) {
  return filter(_complement(fn), list);
});
