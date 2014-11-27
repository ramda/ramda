/**
 * Tests a regular expression against a String
 *
 * @func
 * @memberOf R
 * @category string
 * @sig RegExp -> String -> [String] | null
 * @param {RegExp} rx A regular expression.
 * @param {String} str The string to match against
 * @return {Array} The list of matches, or null if no matches found.
 * @see R.invokerN
 * @example
 *
 *      R.match(/([a-z]a)/g, 'bananas'); //=> ['ba', 'na', 'na']
 */
R.match = invokerN(1, 'match');
