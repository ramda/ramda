var _curry2 = require('./internal/_curry2');


/**
 * Logs the current result in the console
 *
 * @func
 * @memberOf R
 * @since v1.8.0
 * @category List
 * @sig a -> a
 * @return {Object|List|String} The argument that was passed.
 * @example
 *
 *      R.pipe(R.toUpper, R.log, R.toLower, R.log)('abc') // logs 'ABC' and then 'abc'
 */
module.exports = _curry2(function log(message, value) {
  console.log(message, value);

  return value;
});
