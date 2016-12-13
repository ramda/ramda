var _curry3 = require('./internal/_curry3');


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
 * @sig String -> (v -> w) -> {k: v} -> {k: v}
 * @param {String} prop The property name to set
 * @param {Function} fn The function to apply
 * @param {Object} obj The object to clone
 * @return {Object} A new object equivalent to the original except for the changed property.
 * @see R.assoc
 * @see R.dissoc
 * @see R.assocPathWith
 * @example
 *
 *      R.assocWith('b', inc, {a: 1, b: 2}); //=> {a: 1, b: 3 }
 *
 *      R.assocWith('c', identity, {a: 1, b: 2}); //=> {a: 1, b: 2, c: undefined}
 */
module.exports = _curry3(function assocWith(prop, fn, obj) {
  var result = {};
  for (var p in obj) {
    result[p] = obj[p];
  }
  result[prop] = fn(result[prop]);
  return result;
});
