var _curry2 = require('./internal/_curry2');
var _hasMethod = require('./internal/_hasMethod');


/**
 * A function that returns the first truthy of two arguments otherwise the
 * last argument. Note that this is NOT short-circuited, meaning that if
 * expressions are passed they are both evaluated.
 *
 * Dispatches to the `or` method of the first argument if applicable.
 *
 * @func
 * @memberOf R
 * @category Logic
 * @sig * -> * -> *
 * @param {*} a any value
 * @param {*} b any other value
 * @return {*} the first truthy argument, otherwise the last argument.
 * @see R.either
 * @example
 *
 *      R.or(false, true); //=> true
 *      R.or(0, []); //=> []
 *      R.or(null, ''); => ''
 */
module.exports = _curry2(function or(a, b) {
  return _hasMethod('or', a) ? a.or(b) : a || b;
});
