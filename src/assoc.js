var _curry3 = require('./internal/_curry3');


/**
 * Makes a shallow clone of an object, setting or overriding the specified
 * property with the given value. All non-primitive properties are
 * copied by reference.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Object
 * @sig String -> a -> {k: v} -> {k: v}
 * @param {String} prop the property name to set
 * @param {*} val the new value
 * @param {Object} obj the object to clone
 * @return {Object} a new object similar to the original except for the specified property.
 * @see R.dissoc
 * @example
 *
 *      R.assoc('c', 3, {a: 1, b: 2}); //=> {a: 1, b: 2, c: 3}
 */
module.exports = _curry3(function assoc(prop, val, obj) {
  var result = Object.create(Object.getPrototypeOf(obj))
  var properties = Object.getOwnPropertyNames(obj)

  for (var i = 0; i < properties.length; i += 1) {
    result[properties[i]] = obj[properties[i]]
  }

  result[prop] = val;

  return result;
});
