var _curry2 = require('./internal/_curry2');
var _isFunction = require('./internal/_isFunction');
var _isArray = require('./internal/_isArray');


/**
 * Creates a dictionary object from two equally sized lists, treating the first
 * list as an array of keys for the new dictionary.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [b] -> [[a,b]]
 * @param {Array} list1 The first array to consider.
 * @param {Array} list2 The second array to consider.
 * @return {Array} The list containing the new object made by pairing up same-indexed elements of `list1` and `list2`.
 * @example
 *
 *      R.mapObject([1, 2, 3], ['a', 'b', 'c']); //=> [{1:'a',2:'b',3:'c'}]
 * @symb R.mapObject([a, b, c], [d, e, f]) = [{'a':'d','b':'e','c':f}]
 */

module.exports = _curry2(function mapObject(a, b) {
  let mapObject = {};
  if (a == null || !_isFunction(a.concat)) {
    throw new TypeError(toString(a) + ' does not have a method named "concat"');
  }
  if (_isArray(a) && !_isArray(b)) {
    throw new TypeError(toString(b) + ' is not an array');
  }
  if (a.length != b.length) {
    throw new TypeError('Arrays not of equal length');
  }
  for (var i = 0; i < a.length; i += 1) {
    mapObject[a[i]] = b[i];
  }
  return mapObject;
});
