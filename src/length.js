var _curry1 = require('./internal/_curry1');
var is = require('./is');


/**
 * Returns the length of an `Array`, `String`, or arity in case of a `Function`.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig [a] -> Number
 * @param {*} list The value to inspect.
 * @return {Number} The length of the value.
 * @example
 *
 *      R.length([]); //=> 0
 *      R.length([1, 2, 3]); //=> 3
 *      R.length(1); //=> NaN
 */
module.exports = _curry1(function length(list) {
  return list != null && is(Number, list.length) ? list.length : NaN;
});
