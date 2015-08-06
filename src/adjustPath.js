
var _curry3 = require('./internal/_curry3');
var _slice = require('./internal/_slice');
var assoc = require('./assoc');


/**
 * Makes a shallow clone of an object, setting or overriding the nodes required
 * to create the given path, applies the function with the value at the tail
 * end of that path and places the result at the end.  Note that this copies
 * and flattens prototype properties onto the new object as well.  All
 * non-primitive properties are copied by reference.
 * @see R.assocPath
 * @see R.adjust
 *
 * @func
 * @memberOf R
 * @category Object
 * @sig (a -> a) -> [a] -> {k: v} -> {k: v}
 * @param {Function} fn The function to apply.
 * @param {Array} path the path to set
 * @param {Object} obj the object to clone
 * @return {Object} a new object similar to the original except along the specified path.
 * @example
 *
 *      R.adjustPath(R.add(2), ['a', 'b'], {a: {b: 1}}); //=> {a: {b: 3}}
 *
 */
module.exports = _curry3(function assocPath(fn, path, obj) {
  switch (path.length) {
    case 0:
      return obj;
    case 1:
      return assoc(path[0], fn(obj[path[0]]), obj);
    default:
      return assoc(path[0], assocPath(fn, _slice(path, 1), Object(obj[path[0]])), obj);
  }
});
