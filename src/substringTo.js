var substring = require('./substring');


/**
 * Returns a string containing the first `toIndex` characters of `str`.
 *
 * @func
 * @memberOf R
 * @category String
 * @sig Number -> String -> String
 * @param {Number} toIndex
 * @param {String} str
 * @return {String}
 * @example
 *
 *      R.substringTo(3, 'Ramda'); //=> 'Ram'
 *      R.substringTo(-2, 'Ramda'); //=> 'Ram'
 */
module.exports = substring(0);
