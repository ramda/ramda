var _curry2 = require('./internal/_curry2');
var _subequals = require('./internal/_subequals');


/**
 * Returns `true` if its arguments are partially equivalent, `false` otherwise. Handles
 * cyclical data structures. Returns true when the lValue is a subset of the rValue.
 *
 * Dispatches symmetrically to the `partial equals` methods of both arguments, if
 * present.
 *
 * @func
 * @memberOf R
 * @since v0.15.0
 * @category Relation
 * @sig a -> b -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @example
 *
 *      R.pequals(1, 1); //=> true
 *      R.pequals(1, '1'); //=> false
 *      R.pequals([1, 2, 3], [1, 2, 3]); //=> true
 *      R.pequals([1, 2], [1, 2, 3]); //=> true
 *
 *      var a = {}; a.v = a;
 *      var b = {}; b.v = b;
 *      R.pequals(a, b); //=> true
 */
module.exports = _curry2(function subequals(a, b) {
  return _subequals(a, b, [], []);
});
