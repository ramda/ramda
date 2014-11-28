var invokerN = require('./invokerN');


/**
 * returns a subset of a string between one index and another.
 *
 * @func
 * @memberOf R
 * @category string
 * @sig Number -> Number -> String -> String
 * @param {Number} indexA An integer between 0 and the length of the string.
 * @param {Number} indexB An integer between 0 and the length of the string.
 * @param {String} str The string to extract from
 * @return {String} The extracted substring.
 * @see R.invokerN
 * @example
 *
 *      R.substring(2, 5, 'abcdefghijklm'); //=> 'cde'
 */
module.exports = invokerN(2, 'substring');
