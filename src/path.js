var pathOn = require('./pathOn');


/**
 * Retrieve a nested path on an object separated by periods
 *
 * @func
 * @memberOf R
 * @category Object
 * @sig String -> {*} -> *
 * @param {String} path The dot path to use.
 * @return {*} The data at `path`.
 * @example
 *
 *      R.path('a.b', {a: {b: 2}}); //=> 2
 */
module.exports = pathOn('.');
