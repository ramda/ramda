/**
 *
 * Finds the last index of a substring in a string, returning -1 if it's not present
 *
 * @func
 * @memberOf R
 * @category string
 * @sig String -> String -> Number
 * @param {String} c A string to find.
 * @param {String} str The string to search in
 * @return {Number} The last index of `c` or -1 if not found.
 * @see R.invokerN
 * @example
 *
 *      R.strLastIndexOf('a', 'banana split'); //=> 5
 */
R.strLastIndexOf = _curry2(function(c, str) {
    return str.lastIndexOf(c);
});
