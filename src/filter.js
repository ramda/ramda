var _curry2 = require('./internal/_curry2');
var _dispatchable = require('./internal/_dispatchable');
var _filter = require('./internal/_filter');
var _xfilter = require('./internal/_xfilter');


/**
 * Returns a new list containing only those items that match a given predicate function.
 * The predicate function is passed one argument: *(value)*.
 *
 * Note that `R.filter` does not skip deleted or unassigned indices, unlike the native
 * `Array.prototype.filter` method. For more details on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter#Description
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
 * @return {Array} The new filtered array.
 * @see R.reject
 * @example
 *
 *      var isEven = function(n) {
 *        return n % 2 === 0;
 *      };
 *      R.filter(isEven, [1, 2, 3, 4]); //=> [2, 4]
 */
module.exports = _curry2(_dispatchable('filter', _xfilter, _filter));
