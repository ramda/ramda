var _curry3 = require('./internal/_curry3');


/**
 * Returns a lens associated with the provided object.
 *
 * @func
 * @memberOf R
 * @category Object
 * @sig {} -> ({} -> v) -> (v -> a -> *) -> (a -> b)
 * @see R.lens
 * @param {Function} get A function that gets a value by property name
 * @param {Function} set A function that sets a value by property name
 * @return {Function} the returned function has `set` and `map` properties that are
 *         also curried functions.
 * @example
 *
 *     var xo = {x: 1};
 *     var xoLens = R.lensOn(xo,
 *                           function get(o) { return o.x; },
 *                           function set(v) { return {x: v}; });
 *     xoLens(); //=> 1
 *     xoLens.set(1000); //=> {x: 1000}
 *     xoLens.map(R.add(1)); //=> {x: 2}
 */
module.exports = _curry3(function lensOn(get, set, obj) {
  var lns = function() { return get(obj); };
  lns.set = set;
  lns.map = function(fn) { return set(fn(get(obj))); };
  return lns;
});
