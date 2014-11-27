var _curry2 = require('./internal/_curry2');


/**
 * Returns the index of the last element of the list which matches the predicate, or
 * `-1` if no element matches.
 *
 * @func
 * @memberOf R
 * @category List
 * @sig (a -> Boolean) -> [a] -> Number
 * @param {Function} fn The predicate function used to determine if the element is the
 * desired one.
 * @param {Array} list The array to consider.
 * @return {Number} The index of the element found, or `-1`.
 * @example
 *
 *      var xs = [{a: 1, b: 0}, {a:1, b: 1}];
 *      R.findLastIndex(R.propEq('a', 1))(xs); //=> 1
 *      R.findLastIndex(R.propEq('a', 4))(xs); //=> -1
 */
module.exports = _curry2(function findLastIndex(fn, list) {
    var idx = list.length;
    while (idx--) {
        if (fn(list[idx])) {
            return idx;
        }
    }
    return -1;
});
