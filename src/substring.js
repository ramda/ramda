var slice = require('./slice');


/**
 * Returns a string containing the characters of `str` from `fromIndex`
 * (inclusive) to `toIndex` (exclusive).
 *
 * @func
 * @memberOf R
 * @category String
 * @sig Number -> Number -> String -> String
 * @param {Number} fromIndex The start index (inclusive).
 * @param {Number} toIndex The end index (exclusive).
 * @param {String} str The string to slice.
 * @return {String}
 * @see R.slice
 * @example
 *
 *      R.substring(2, 5, 'abcdefghijklm'); //=> 'cde'
 */
module.exports = slice;
