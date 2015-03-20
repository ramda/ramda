var __ = require('./__');
var substring = require('./substring');


/**
 * Returns a string containing the characters of `str` from `fromIndex`
 * (inclusive) to the end of `str`.
 *
 * @func
 * @memberOf R
 * @category String
 * @sig Number -> String -> String
 * @param {Number} fromIndex
 * @param {String} str
 * @return {String}
 * @example
 *
 *      R.substringFrom(3, 'Ramda'); //=> 'da'
 *      R.substringFrom(-2, 'Ramda'); //=> 'da'
 */
module.exports = substring(__, Infinity);
