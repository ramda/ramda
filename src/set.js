var _curry2 = require('./internal/_curry2');
var _extend = require('./internal/_extend');
var _has = require('./internal/_has');
var _isArray = require('./internal/_isArray');
var isEmpty = require('./isEmpty');
var keys = require('./keys');


/**
 * Creates a new object with the values from `b` merged with the
 * values in `a`. Only own enumerable properties are considered. This function
 * recursively handles nested objects, but not arrays, with own enumerable
 * properties. All non-primitive properties are copied by reference if
 * possible. This function * will *not* mutate passed-in objects.
 *
 * @func
 * @memberOf R
 * @category Object
 * @sig {k: v} -> {k: v} -> {k: v}
 * @param {Object} a object with higher precedence in output
 * @param {Object} b source object
 * @return {Object} The merged object.
 * @example
 *
 *      R.set({age: 40, {name: 'fred', age: 10});
 *      //=> {'name': 'fred', 'age': 40}
 *
 *      R.set({parent: {age: 40}}, {name: 'fred', age: 10, parent: {age: 39}});
 *      //=> {'name': 'fred', 'age': 10, {parent: {age: 40}}}
 */
module.exports = _curry2(function set(update, original) {
  if (_isArray(update) || _isArray(original)) {
    return update;
  }
  var updateKeys = keys(update);
  var originalKeys = keys(original);
  if (isEmpty(updateKeys) || isEmpty(originalKeys)) {
    return update;
  }
  var result = _extend({}, original);
  var key, idx = -1, length = updateKeys.length;
  while (++idx < length) {
    key = updateKeys[idx];
    result[key] = _has(key, original) ? set(update[key], original[key]) : update[key];
  }
  return result;
});
