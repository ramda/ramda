var _curry2 = require('./internal/_curry2');
var _indexOf = require('./internal/_indexOf');


/**
 * Returns a partial copy of an object containing only the keys specified.  If the key does not exist, the
 * property is ignored.
 *
 * @func
 * @memberOf R
 * @category Object
 * @sig [String] -> {String: *} -> {String: *}
 * @param {Array} names an array of String property names to copy onto a new object
 * @param {Object} obj The object to copy from
 * @return {Object} A new object with only properties from `names` on it.
 * @example
 *
 *      R.pick(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, d: 4}
 *      R.pick(['a', 'e', 'f'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1}
 */
module.exports = _curry2(function pick(names, obj) {
  var result = {};
  for (var prop in obj) {
    if (_indexOf(names, prop) >= 0) {
      result[prop] = obj[prop];
    }
  }
  return result;
});
