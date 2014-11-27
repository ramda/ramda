/**
 * Returns `true` if at least one of elements of the list match the predicate, `false`
 * otherwise.
 *
 * @func
 * @memberOf R
 * @category List
 * @sig (a -> Boolean) -> [a] -> Boolean
 * @param {Function} fn The predicate function.
 * @param {Array} list The array to consider.
 * @return {Boolean} `true` if the predicate is satisfied by at least one element, `false`
 *         otherwise.
 * @example
 *
 *      var lessThan0 = R.flip(R.lt)(0);
 *      var lessThan2 = R.flip(R.lt)(2);
 *      var xs = R.range(1, 3);
 *      xs; //=> [1, 2]
 *      R.some(lessThan0)(xs); //=> false
 *      R.some(lessThan2)(xs); //=> true
 */
function some(fn, list) {
    var idx = -1;
    while (++idx < list.length) {
        if (fn(list[idx])) {
            return true;
        }
    }
    return false;
}
R.some = _curry2(some);
