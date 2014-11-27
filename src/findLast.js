var _curry2 = require('./internal/_curry2');


/**
 * Returns the last element of the list which matches the predicate, or `undefined` if no
 * element matches.
 *
 * @func
 * @memberOf R
 * @category List
 * @sig (a -> Boolean) -> [a] -> a | undefined
 * @param {Function} fn The predicate function used to determine if the element is the
 * desired one.
 * @param {Array} list The array to consider.
 * @return {Object} The element found, or `undefined`.
 * @example
 *
 *      var xs = [{a: 1, b: 0}, {a:1, b: 1}];
 *      R.findLast(R.propEq('a', 1))(xs); //=> {a: 1, b: 1}
 *      R.findLast(R.propEq('a', 4))(xs); //=> undefined
 */
module.exports = _curry2(function findLast(fn, list) {
    var idx = list.length;
    while (idx--) {
        if (fn(list[idx])) {
            return list[idx];
        }
    }
});
