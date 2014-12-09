var invoker = require('./invoker');


/**
 * Tests a regular expression against a String
 *
 * @func
 * @memberOf R
 * @category String
 * @sig RegExp -> String -> [String] | null
 * @param {RegExp} rx A regular expression.
 * @param {String} str The string to match against
 * @return {Array} The list of matches, or null if no matches found.
 * @see R.invoker
 * @example
 *
 *      R.match(/([a-z]a)/g, 'bananas'); //=> ['ba', 'na', 'na']
 */
module.exports = invoker(1, 'match');
