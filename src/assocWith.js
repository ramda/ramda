var _curry3 = require('./internal/_curry3');
var _isArray = require('./internal/_isArray');


/**
 * Makes a shallow clone of an object, overriding the specified property with
 * the supplied function, applied to the previous value. If no previous value
 * exists, the function will be given undefined as it's argument. Note: that
 * this copies and flattens prototype properties onto the new object as well.
 * All non-primitive properties are copied by reference.
 *
 * @func
 * @memberOf R
 * @category Object
 * @sig (v -> w) -> String -> {k: v} -> {k: v}
 * @param {Function} fn The function to apply
 * @param {String} prop The property name to set
 * @param {Object} obj The object to clone
 * @return {Object} A new object equivalent to the original except for the changed property.
 * @see R.assoc
 * @see R.dissoc
 * @see R.assocPathWith
 * @example
 *
 *      R.assocWith(inc, 'b', {a: 1, b: 2}); //=> {a: 1, b: 3 }
 *
 *      R.assocWith(identity, 'c', {a: 1, b: 2}); //=> {a: 1, b: 2, c: undefined}
 */
module.exports = _curry3(function assocWith(fn, prop, obj) {
  var result = _isArray(obj) ? [] : {};
  for (var p in obj) {
    result[p] = obj[p];
  }
  result[prop] = fn(result[prop]);
  return result;
});
