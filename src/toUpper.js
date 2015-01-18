var invoker = require('./invoker');


/**
 * The upper case version of a string.
 *
 * @func
 * @memberOf R
 * @category String
 * @sig String -> String
 * @param {String} str The string to upper case.
 * @return {String} The upper case version of `str`.
 * @example
 *
 *      > R.toUpper('abc')
 *      'ABC'
 */
module.exports = invoker(0, 'toUpperCase');
