var _assocPath = require('./internal/_assocPath');
var _curry3 = require('./internal/_curry3');


/**
 * Makes a shallow clone of an object, setting or overriding the nodes
 * required to create the given path, and placing the specific value at the
 * tail end of that path.  Note that this copies and flattens prototype
 * properties onto the new object as well.  All non-primitive properties
 * are copied by reference.
 *
 * @func
 * @memberOf R
 * @category Object
 * @sig [String] -> a -> {k: v} -> {k: v}
 * @param {Array} path the path to set
 * @param {*} val the new value
 * @param {Object} obj the object to clone
 * @return {Object} a new object similar to the original except along the specified path.
 * @example
 *
 *      R.assocPath(['a', 'b', 'c'], 42, {a: {b: {c: 0}}}); //=> {a: {b: {c: 42}}}
 */
module.exports = _curry3(_assocPath);
