/**
 * The lower case version of a string.
 *
 * @func
 * @memberOf R
 * @category string
 * @sig String -> String
 * @param {String} str The string to lower case.
 * @return {String} The lower case version of `str`.
 * @example
 *
 *      R.toLowerCase('XYZ'); //=> 'xyz'
 */
R.toLowerCase = invokerN(0, 'toLowerCase');
