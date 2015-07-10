var _curry2 = require('./internal/_curry2');
var compose = require('./compose');
var defaultTo = require('./defaultTo');
var invoker = require('./invoker');


/**
 * Tests a regular expression against a String. Note that this function
 * will return an empty array when there are no matches. This differs
 * from [`String.prototype.match`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match)
 * which returns `null` when there are no matches.
 *
 * @func
 * @memberOf R
 * @category String
 * @sig RegExp -> String -> [String | Undefined]
 * @param {RegExp} rx A regular expression.
 * @param {String} str The string to match against
 * @return {Array} The list of matches.
 * @example
 *
 *      R.match(/([a-z]a)/g, 'bananas'); //=> ['ba', 'na', 'na']
 */
module.exports = _curry2(compose(defaultTo([]), invoker(1, 'match')));
