var invoker = require('./invoker');


/**
 * The lower case version of a string.
 *
 * @func
 * @memberOf R
 * @category String
 * @sig String -> String
 * @param {String} str The string to lower case.
 * @return {String} The lower case version of `str`.
 * @example
 *
 *      > R.toLower('XYZ')
 *      'xyz'
 */
module.exports = invoker(0, 'toLowerCase');
