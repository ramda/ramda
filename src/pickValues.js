var _curry2 = require('./internal/_curry2');


/**
 * Returns a list of values matching the keys specified.
 * property is ignored.
 *
 * @func
 * @memberOf R
 * @category Object
 * @sig [k] -> {k: v} -> [v]
 * @param {Array} names an array of String property names get values for
 * @param {Object} obj The object to get values from
 * @return {Array} A new object with only properties from `names` on it.
 * @return {Array} A new list with values mathcing the keys specified
 * @example
 *
 *      R.pickValues(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> [1, 4]
 *      R.pickValues(['a', 'e', 'f'], {a: 1, b: 2, c: 3, d: 4}); //=> [1]
 */
module.exports = _curry2(function pick(keys, obj) {
  var result = [];
  var idx = 0;
  while (idx < keys.length) {
    if (keys[idx] in obj) {
      result.push(obj[keys[idx]]);
    }
    idx += 1;
  }
  return result;
});
