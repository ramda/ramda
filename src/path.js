var _curry2 = require('./internal/_curry2');
var _path = require('./internal/_path');


/**
 * Retrieve the value at a given path.
 *
 * @func
 * @memberOf R
 * @category Object
 * @sig [String] -> {*} -> *
 * @param {Array} path The path to use.
 * @return {*} The data at `path`.
 * @example
 *
 *      R.path(['a', 'b'], {a: {b: 2}}); //=> 2
 */
module.exports = _curry2(_path);
