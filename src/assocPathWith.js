var _curry3 = require('./internal/_curry3');
var assocWith = require('./assocWith');
var _curry3 = require('./internal/_curry3');
var _isInteger = require('./internal/_isInteger');


/**
 * Makes a shallow clone of an object, setting or overriding the nodes required
 * to create the given path, and applying the given function to the tail end of
 * that path. If no previous value exists, undefined will be supplied to the
 * given function. Note that this copies and flattens prototype properties onto
 * the new object as well. All non-primitive properties are copied by reference.
 *
 * @func
 * @memberOf R
 * @category Object
 * @sig (v -> w) -> [String] -> {k: v} -> {k: v}
 * @param {Function} fn function to apply
 * @param {Array} path the path to set
 * @param {Object} obj The object to clone
 * @return {Object} A new object equivalent to the original except along the specified path.
 * @see R.path
 * @see R.assocPath
 * @see R.assocWith
 * @example
 *
 *      R.assocPathWith(always(42), ['a', 'b', 'c'], {a: {b: {c: 0}}}); //=> {a: {b: {c: 42}}}
 *
 *      R.assocPathWith(always(42), ['a', 'b', 'c'], {a: 5}); //=> {a: {b: {c: 42}}}
 */
module.exports = _curry3(function assocPathWith(fn, path, obj) {
  switch (path.length) {
    case 0: return fn(obj);
    case 1:
      return assocWith(fn, path[0], obj);
    default:
      var idx = path[0];
      var result = _isInteger(idx) ? [] : {};
      for (var p in obj) {
        result[p] = obj[p];
      }
      result[idx] = assocPathWith(fn, Array.prototype.slice.call(path, 1), result[idx]);
      return result;
  }
});
