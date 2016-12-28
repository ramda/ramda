var _curry3 = require('./internal/_curry3');
var _slice = require('./internal/_slice');
var assoc = require('./assoc');
var assocWith = require('./assocWith');


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
 * @sig [String] -> (a -> b) -> {k: v} -> {k: v}
 * @param {Array} path the path to set
 * @param {Function} fn function to apply
 * @param {Object} obj The object to clone
 * @return {Object} A new object equivalent to the original except along the specified path.
 * @see R.path
 * @see R.assocPath
 * @see R.assocWith
 * @example
 *
 *      R.assocPathWith(['a', 'b', 'c'], always(42), {a: {b: {c: 0}}}); //=> {a: {b: {c: 42}}}
 *
 *      R.assocPathWith(['a', 'b', 'c'], always(42), {a: 5}); //=> {a: {b: {c: 42}}}
 */
module.exports = _curry3(function assocPathWith(path, fn, obj) {
  switch (path.length) {
    case 0:
      return fn(obj);
    case 1:
      return assocWith(path[0], fn, obj);
    default:
      return assoc(path[0], assocPathWith(_slice(path, 1), fn, Object(obj[path[0]])), obj);
  }
});
