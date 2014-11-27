/**
 * Returns the nth element in a list.
 * If n is negative the element at index length + n is returned.
 *
 * @func
 * @memberOf R
 * @category core
 * @category List
 * @sig [a] -> a
 * @param {Number} idx
 * @param {Array} list
 * @return {*} The nth element of the list.
 * @example
 *
 *      var list = ['foo', 'bar', 'baz', 'quux'];
 *      R.nth(1, list); //=> 'bar'
 *      R.nth(-1, list); //=> 'quux'
 *      R.nth(-99, list); //=> undefined
 */
var nth = R.nth = _curry2(function nth(n, list) {
    return n < 0 ? list[list.length + n] : list[n];
});
