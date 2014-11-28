var invokerN = require('./invokerN');


/**
 * The character at the nth position in a String:
 *
 * @func
 * @memberOf R
 * @category string
 * @sig Number -> String -> String
 * @param {Number} index An integer between 0 and the length of the string.
 * @param {String} str The string to extract a char from
 * @return {String} The character at `index` of `str`.
 * @see R.invokerN
 * @example
 *
 *      R.charAt(8, 'abcdefghijklm'); //=> 'i'
 */
module.exports = invokerN(1, 'charAt');
