var _curry2 = require('./internal/_curry2');
var keys = require('./keys');


/**
 * Like `filterObj`, but passes additional arguments to the predicate function.
 * The predicate function is passed three arguments: *(value, key, obj)*.
 *
 * @func
 * @memberOf R
 * @category Object
 * @sig (a, String, {String, a} -> Boolean) -> {String, a} -> {String, a}
 * @param {Function} fn The function called per key.
 * @param {Object} obj The object to iterate over the keys.
 * @return {Object} The new filtered object.
 * @example
 *
 *      var isUpperCase = function(val, key) { return key.toUpperCase() === key; };
 *      var isUpperCasePositive = function(value, key) {
 *        return value > 0 && isUpperCase(key);
 *      };
 *      R.filterObjIndexed(isUpperCasePositive, {a: 1, B: 2, c: -1, D: 0, e: 5}); //=> {B: 2}
 */
module.exports = _curry2(function filterObjIndexed(fn, obj) {
  var result = {}, ks = keys(obj), idx = ks.length;
  while (--idx >= 0) {
    if (fn(obj[ks[idx]], ks[idx], obj)) {
      result[ks[idx]] = obj[ks[idx]];
    }
  }
  return result;
});
