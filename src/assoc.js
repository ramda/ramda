var _curry3 = require('./internal/_curry3');
var _isArray = require('./internal/_isArray');


/**
 * Makes a shallow clone of an object, setting or overriding the specified
 * property with the given value. Note that this copies and flattens prototype
 * properties onto the new object as well. All non-primitive properties are
 * copied by reference.
 *
 * @func
 * @memberOf R
 * @since v0.8.0
 * @category Object
 * @sig String -> a -> {k: v} -> {k: v}
 * @param {String} prop The property name to set
 * @param {*} val The new value
 * @param {Object} obj The object to clone
 * @return {Object} A new object equivalent to the original except for the changed property.
 * @see R.dissoc
 * @example
 *
 *      R.assoc('c', 3, {a: 1, b: 2}); //=> {a: 1, b: 2, c: 3}
 */
module.exports = _curry3(function assoc(prop, val, obj) {
  if (_isArray(obj)) {
    var newArr = [].concat(obj);
    if (prop < 0 && Math.abs(prop) > newArr.length) {
      throw new Error('Invalid index');
    }
    var arrIdx = prop < 0 ? newArr.length + prop : prop;
    newArr[arrIdx] = val;
    return newArr;
  }

  var result = {};
  for (var p in obj) {
    result[p] = obj[p];
  }
  result[prop] = val;
  return result;
});
