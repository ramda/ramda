var join = require('./join');


/**
 * Joins (with separating spaces) a list of words.
 *
 * @func
 * @memberOf R
 * @category String
 * @sig [String] -> String
 * @param {Array}
 * @return {String}
 * @see R.words
 * @example
 *
 *      R.unwords(['foo', 'bar', 'baz']); //=> 'foo bar baz'
 */
module.exports = join(' ');
