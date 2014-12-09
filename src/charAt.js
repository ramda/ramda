var invoker = require('./invoker');


/**
 * The character at the nth position in a String:
 *
 * @func
 * @memberOf R
 * @category String
 * @sig Number -> String -> String
 * @param {Number} index An integer between 0 and the length of the string.
 * @param {String} str The string to extract a char from
 * @return {String} The character at `index` of `str`.
 * @see R.invoker
 * @example
 *
 *      R.charAt(8, 'abcdefghijklm'); //=> 'i'
 */
module.exports = invoker(1, 'charAt');
