/**
 * Determines the smallest of a list of items as determined by pairwise comparisons from the supplied comparator
 *
 * @func
 * @memberOf R
 * @category math
 * @sig (a -> Number) -> [a] -> a
 * @param {Function} keyFn A comparator function for elements in the list
 * @param {Array} list A list of comparable elements
 * @see R.min
 * @return {*} The greatest element in the list. `undefined` if the list is empty.
 * @example
 *
 *      function cmp(obj) { return obj.x; }
 *      var a = {x: 1}, b = {x: 2}, c = {x: 3};
 *      R.minBy(cmp, [a, b, c]); //=> {x: 1}
 */
R.minBy = _curry2(_createMaxMinBy(lt));
