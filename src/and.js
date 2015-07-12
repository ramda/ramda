var _curry2 = require('./internal/_curry2');
var _hasMethod = require('./internal/_hasMethod');


/**
 * A function that returns the first argument if it's falsy otherwise the second
 * argument. Note that this is NOT short-circuited, meaning that if expressions
 * are passed they are both evaluated.
 *
 * Dispatches to the `and` method of the first argument if applicable.
 *
 * @func
 * @memberOf R
 * @category Logic
 * @sig * -> * -> *
 * @param {*} a any value
 * @param {*} b any other value
 * @return {*} the first argument if falsy otherwise the second argument.
 * @see R.both
 * @example
 *
 *      R.and(false, true); //=> false
 *      R.and(0, []); //=> 0
 *      R.and(null, ''); => null
 */
module.exports = _curry2(function and(a, b) {
  return _hasMethod('and', a) ? a.and(b) : a && b;
});
