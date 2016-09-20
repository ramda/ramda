var $ = require('sanctuary-def');

var _cloneRegExp = require('./internal/_cloneRegExp');
var _def = require('./internal/_def');


/**
 * Determines whether a given string matches a given regular expression.
 *
 * @func
 * @memberOf R
 * @since v0.12.0
 * @category String
 * @sig RegExp -> String -> Boolean
 * @param {RegExp} pattern
 * @param {String} str
 * @return {Boolean}
 * @see R.match
 * @example
 *
 *      R.test(/^x/, 'xyz'); //=> true
 *      R.test(/^y/, 'xyz'); //=> false
 */
module.exports =
_def('test',
     {},
     [$.RegExp, $.String, $.Boolean],
     function test(pattern, str) { return _cloneRegExp(pattern).test(str); });
