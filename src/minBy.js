var _createMaxMinBy = require('./internal/_createMaxMinBy');
var _curry2 = require('./internal/_curry2');
var _lt = require('./internal/_lt');


/**
 * Determines the smallest of a list of items as determined by pairwise comparisons from the supplied comparator
 *
 * @func
 * @memberOf R
 * @category Math
 * @sig (a -> Number) -> [a] -> a
 * @param {Function} keyFn A comparator function for elements in the list
 * @param {Array} list A list of comparable elements
 * @see R.min
 * @return {*} The greatest element in the list. `undefined` if the list is empty.
 * @example
 *
 *      > R.minBy(function(obj) { return obj.x; }, [{x: 1}, {x: 2}, {x: 3}])
 *      {x: 1}
 */
module.exports = _curry2(_createMaxMinBy(_lt));
