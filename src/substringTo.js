var substring = require('./substring');


/**
 * The leading substring of a String ending before the nth character:
 *
 * @func
 * @memberOf R
 * @category String
 * @sig Number -> String -> String
 * @param {Number} indexA An integer between 0 and the length of the string.
 * @param {String} str The string to extract from
 * @return {String} The extracted substring.
 * @example
 *
 *      R.substringTo(8, 'abcdefghijklm'); //=> 'abcdefgh'
 */
module.exports = substring(0);
