var invokerN = require('./invokerN');


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
 *      R.toUpper('abc'); //=> 'ABC'
 */
module.exports = invokerN(0, 'toUpperCase');
