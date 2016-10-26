var _contains = require('./internal/_contains');
var _curry3 = require('./internal/_curry3');

/**
 * Returns a partial copy of an object omitting the keys specified that fulfill a test.
 *
 * @func
 * @memberOf R
 * @category Object
 * @sig (v, k, o -> Boolean) -> {String: *} -> {k: v}
 * @param {Function} pred A predicate to determine whether or not a key will be omitted
 * @param {Array} names an array of String property names to omit from the new object
 * @param {Object} obj The object to copy from
 * @return {Object} A new object without properties `names` fulfilling `test`.
 * @example
 *
 *      R.omit(R.lt(2), ['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {a:1, b: 2, c: 3}
 */
module.exports = _curry3(function omit(test, names, obj) {
  var result = {};
  for (var prop in obj) {
    if (!(_contains(prop, names) && test(obj[prop], prop, obj))) {
      result[prop] = obj[prop];
    }
  }
  return result;
});