var _curry2 = require('./internal/_curry2');
var _hasMethod = require('./internal/_hasMethod');
var indexOf = require('./indexOf');


/**
 * Returns `true` if the specified value is equal, in `R.equals` terms,
 * to at least one element of the given list; `false` otherwise.
 *
 * Dispatches to the collection's `contains` method if applicable. If the
 * collection does not have a `contains` method but does have an `indexOf`
 * method, this function dispatches to `indexOf` and returns `true` if the
 * return value is greater than or equal to zero; `false` otherwise. As a
 * result, this function can be used to determine whether a given string
 * contains a particular substring.
 *
 * @func
 * @memberOf R
 * @category List
 * @sig a -> [a] -> Boolean
 * @param {Object} a The item to compare against.
 * @param {Array} xs The collection to consider.
 * @return {Boolean} `true` if the item is in the collection, `false` otherwise.
 *
 * @example
 *
 *      R.contains(3, [1, 2, 3]); //=> true
 *      R.contains(4, [1, 2, 3]); //=> false
 *      R.contains([42], [[42]]); //=> true
 *      R.contains('am', 'Ramda'); //=> true
 */
module.exports = _curry2(function contains(a, xs) {
  return _hasMethod('contains', xs) ? xs.contains(a) : indexOf(a, xs) >= 0;
});
