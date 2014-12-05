var _curry2 = require('./internal/_curry2');


/**
 * Returns the first element of the list which matches the predicate, or `undefined` if no
 * element matches.
 *
 * @func
 * @memberOf R
 * @category List
 * @sig (a -> Boolean) -> [a] -> a | undefined
 * @param {Function} fn The predicate function used to determine if the element is the
 *        desired one.
 * @param {Array} list The array to consider.
 * @return {Object} The element found, or `undefined`.
 * @example
 *
 *      var xs = [{a: 1}, {a: 2}, {a: 3}];
 *      R.find(R.propEq('a', 2))(xs); //=> {a: 2}
 *      R.find(R.propEq('a', 4))(xs); //=> undefined
 */
module.exports = _curry2(function find(fn, list) {
    var idx = -1;
    var len = list.length;
    while (++idx < len) {
        if (fn(list[idx])) {
            return list[idx];
        }
    }
});
