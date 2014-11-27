/**
 * Returns a new list containing all but the first `n` elements of the given `list`.
 *
 * @func
 * @memberOf R
 * @category List
 * @sig Number -> [a] -> [a]
 * @param {Number} n The number of elements of `list` to skip.
 * @param {Array} list The array to consider.
 * @return {Array} The last `n` elements of `list`.
 * @example
 *
 *     R.skip(3, [1,2,3,4,5,6,7]); //=> [4,5,6,7]
 */
R.skip = _curry2(_checkForMethod('skip', function skip(n, list) {
    if (n < list.length) {
        return _slice(list, n);
    } else {
        return [];
    }
}));
