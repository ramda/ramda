var _curry3 = require('./internal/_curry3');
var _eq = require('./internal/_eq');


/**
 * Reports whether two objects have the same value for the specified property.  Useful as a curried predicate.
 *
 * Has `Object.is` semantics: `NaN` is considered equal to `NaN`; `0` and `-0`
 * are not considered equal.
 *
 * @func
 * @memberOf R
 * @category Object
 * @sig k -> {k: v} -> {k: v} -> Boolean
 * @param {String} prop The name of the property to compare
 * @param {Object} obj1
 * @param {Object} obj2
 * @return {Boolean}
 *
 * @example
 *
 *      var o1 = { a: 1, b: 2, c: 3, d: 4 };
 *      var o2 = { a: 10, b: 20, c: 3, d: 40 };
 *      R.eqProps('a', o1, o2); //=> false
 *      R.eqProps('c', o1, o2); //=> true
 */
module.exports = _curry3(function eqProps(prop, obj1, obj2) {
  return _eq(obj1[prop], obj2[prop]);
});
