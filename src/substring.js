var invoker = require('./invoker');


/**
 * returns a subset of a string between one index and another.
 *
 * @func
 * @memberOf R
 * @category String
 * @sig Number -> Number -> String -> String
 * @param {Number} indexA An integer between 0 and the length of the string.
 * @param {Number} indexB An integer between 0 and the length of the string.
 * @param {String} str The string to extract from
 * @return {String} The extracted substring.
 * @see R.invoker
 * @example
 *
 *      R.substring(2, 5, 'abcdefghijklm'); //=> 'cde'
 */
module.exports = invoker(2, 'substring');
