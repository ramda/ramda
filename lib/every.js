/**
 * Returns `true` if all elements of the list match the predicate, `false` if there are any
 * that don't.
 *
 * @func
 * @memberOf R
 * @category List
 * @sig (a -> Boolean) -> [a] -> Boolean
 * @param {Function} fn The predicate function.
 * @param {Array} list The array to consider.
 * @return {Boolean} `true` if the predicate is satisfied by every element, `false`
 *         otherwise.
 * @example
 *
 *      var lessThan2 = R.flip(R.lt)(2);
 *      var lessThan3 = R.flip(R.lt)(3);
 *      var xs = R.range(1, 3);
 *      xs; //=> [1, 2]
 *      R.every(lessThan2)(xs); //=> false
 *      R.every(lessThan3)(xs); //=> true
 */
function every(fn, list) {
    var idx = -1;
    while (++idx < list.length) {
        if (!fn(list[idx])) {
            return false;
        }
    }
    return true;
}
R.every = _curry2(every);
