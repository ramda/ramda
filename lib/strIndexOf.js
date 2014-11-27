/**
 * Finds the first index of a substring in a string, returning -1 if it's not present
 *
 * @func
 * @memberOf R
 * @category string
 * @sig String -> String -> Number
 * @param {String} c A string to find.
 * @param {String} str The string to search in
 * @return {Number} The first index of `c` or -1 if not found.
 * @see R.invokerN
 * @example
 *
 *      R.strIndexOf('c', 'abcdefg'); //=> 2
 */
R.strIndexOf = _curry2(function strIndexOf(c, str) {
    return str.indexOf(c);
});
