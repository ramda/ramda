var _curry2 = require('./internal/_curry2');
var _dissocPath = require('./internal/_dissocPath');


/**
 * Makes a shallow clone of an object, omitting the property at the
 * given path. Note that this copies and flattens prototype properties
 * onto the new object as well.  All non-primitive properties are copied
 * by reference.
 *
 * @func
 * @memberOf R
 * @category Object
 * @sig [String] -> {k: v} -> {k: v}
 * @param {Array} path the path to set
 * @param {Object} obj the object to clone
 * @return {Object} a new object without the property at path
 * @example
 *
 *      R.dissocPath(['a', 'b', 'c'], {a: {b: {c: 42}}}); //=> {a: {b: {}}}
 */
module.exports = _curry2(_dissocPath);
