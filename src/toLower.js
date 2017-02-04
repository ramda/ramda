var invoker = require('./invoker');


/**
 * 把字符串转换成小写。
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category String
 * @sig String -> String
 * @param {String} str 待转换的字符串
 * @return {String} `str`的小写字符串
 * @see R.toUpper
 * @example
 *
 *      R.toLower('XYZ'); //=> 'xyz'
 */
module.exports = invoker(0, 'toLowerCase');
