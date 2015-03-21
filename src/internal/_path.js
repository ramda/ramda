/**
 * internal path function
 * Takes an array, paths, indicating the deep set of keys
 * to find.
 *
 * @private
 * @memberOf R
 * @category Object
 * @param {Array} paths An array of strings to map to object properties
 * @param {Object} obj The object to find the path in
 * @return {Array} The value at the end of the path or `undefined`.
 * @example
 *
 *      _path(['a', 'b'], {a: {b: 2}}); //=> 2
 */
module.exports = function _path(paths, obj) {
  if (obj == null || paths.length === 0) {
    return;
  } else {
    var val = obj;
    for (var idx = 0, len = paths.length; idx < len && val != null; idx += 1) {
      val = val[paths[idx]];
    }
    return val;
  }
};
