/**
 * Returns a new list containing the first `n` elements of the given list.  If
 * `n > * list.length`, returns a list of `list.length` elements.
 *
 * @func
 * @memberOf R
 * @category List
 * @sig Number -> [a] -> [a]
 * @param {Number} n The number of elements to return.
 * @param {Array} list The array to query.
 * @return {Array} A new array containing the first elements of `list`.
 */
R.take = _curry2(_checkForMethod('take', function(n, list) {
    return _slice(list, 0, Math.min(n, list.length));
}));
