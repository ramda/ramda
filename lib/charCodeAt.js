var invokerN = require('./invokerN');


/**
 * The ascii code of the character at the nth position in a String:
 *
 * @func
 * @memberOf R
 * @category string
 * @sig Number -> String -> Number
 * @param {Number} index An integer between 0 and the length of the string.
 * @param {String} str The string to extract a charCode from
 * @return {Number} The code of the character at `index` of `str`.
 * @see R.invokerN
 * @example
 *
 *      R.charCodeAt(8, 'abcdefghijklm'); //=> 105
 *      // (... 'a' ~ 97, 'b' ~ 98, ... 'i' ~ 105)
 */
module.exports = invokerN(1, 'charCodeAt');
