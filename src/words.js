var compose = require('./compose');
var isEmpty = require('./isEmpty');
var reject = require('./reject');
var split = require('./split');


/**
 * Splits a string into a list of words, which were delimited by whitespace
 * characters.
 *
 * @func
 * @memberOf R
 * @category String
 * @sig String -> [String]
 * @param {String}
 * @return {Array}
 * @see R.unwords
 * @example
 *
 *      R.words(' foo  bar  baz '); //=> ['foo', 'bar', 'baz']
 *      R.words('foo\nbar\nbaz\n'); //=> ['foo', 'bar', 'baz']
 */
module.exports = compose(reject(isEmpty), split(/\s+/));
