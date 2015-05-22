var _curry2 = require('./internal/_curry2');
var _equals = require('./internal/_equals');
var _hasMethod = require('./internal/_hasMethod');


/**
 * Returns `true` if its arguments are equivalent, `false` otherwise.
 * Dispatches to an `equals` method if present. Handles cyclical data
 * structures.
 *
 * @func
 * @memberOf R
 * @category Relation
 * @sig a -> b -> Boolean
 * @param {*} a
 * @param {*} b
 * @return {Boolean}
 * @example
 *
 *      R.equals(1, 1); //=> true
 *      R.equals(1, '1'); //=> false
 *      R.equals([1, 2, 3], [1, 2, 3]); //=> true
 *
 *      var a = {}; a.v = a;
 *      var b = {}; b.v = b;
 *      R.equals(a, b); //=> true
 */
module.exports = _curry2(function equals(a, b) {
  return _hasMethod('equals', a) ? a.equals(b) :
         _hasMethod('equals', b) ? b.equals(a) : _equals(a, b, [], []);
});
