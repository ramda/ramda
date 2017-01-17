var _curry2 = require('./internal/_curry2');


/**
 * 对一个字符串测试正则表达式。注意当没有匹配项时这个函数会返回一个空数组。这一点和
 * [`String.prototype.match`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match)
 * 有所不同，后者在没有匹配项时会返回`null`。
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category String
 * @sig RegExp -> String -> [String | Undefined]
 * @param {RegExp} rx A regular expression.
 * @param {String} str The string to match against
 * @return {Array} The list of matches or empty array.
 * @see R.test
 * @example
 *
 *      R.match(/([a-z]a)/g, 'bananas'); //=> ['ba', 'na', 'na']
 *      R.match(/a/, 'b'); //=> []
 *      R.match(/a/, null); //=> TypeError: null does not have a method named "match"
 */
module.exports = _curry2(function match(rx, str) {
  return str.match(rx) || [];
});
