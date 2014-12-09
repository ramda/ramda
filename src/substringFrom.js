var flip = require('./flip');
var substring = require('./substring');


/**
 * The trailing substring of a String starting with the nth character:
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
 *      R.substringFrom(8, 'abcdefghijklm'); //=> 'ijklm'
 */
module.exports = flip(substring)(void 0);
