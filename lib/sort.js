var _curry2 = require('./_curry2');
var clone = require('./clone');


/**
 * Returns a copy of the list, sorted according to the comparator function, which should accept two values at a
 * time and return a negative number if the first value is smaller, a positive number if it's larger, and zero
 * if they are equal.  Please note that this is a **copy** of the list.  It does not modify the original.
 *
 * @func
 * @memberOf R
 * @category List
 * @sig (a,a -> Number) -> [a] -> [a]
 * @param {Function} comparator A sorting function :: a -> b -> Int
 * @param {Array} list The list to sort
 * @return {Array} a new array with its elements sorted by the comparator function.
 * @example
 *
 *      var diff = function(a, b) { return a - b; };
 *      R.sort(diff, [4,2,7,5]); //=> [2, 4, 5, 7]
 */
module.exports = _curry2(function sort(comparator, list) {
    return clone(list).sort(comparator);
});
