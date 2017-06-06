var _curry2 = require('./internal/_curry2');

/**
 * K-combinator. Takes two arguments and returns the first.
 *
 * @func
 * @memberOf R
 * @category Function
 * @sig a -> b -> a
 *
 * @param {*} a The value to return
 * @param {*} b A value to discard
 * @return {*} The first parameter
 * @example
 *    R.K('foo', 'bar') //=> 'foo'
 *    R.K('foo')('bar') //=> 'foo'
 *
 */
/*jshint unused:false */
module.exports = _curry2(function(a, b) {
  return a;
});
