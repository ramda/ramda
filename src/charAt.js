var invoker = require('./invoker');


/**
 * The character at the nth position in a String:
 *
 * @deprecated since v0.12.0
 * @func
 * @memberOf R
 * @category String
 * @sig Number -> String -> String
 * @param {Number} index An integer between 0 and the length of the string.
 * @param {String} str The string to extract a char from
 * @return {String} The character at `index` of `str`.
 * @see R.nthChar
 * @example
 *
 *      R.charAt(8, 'abcdefghijklm'); //=> 'i'
 */
module.exports = invoker(1, 'charAt');
