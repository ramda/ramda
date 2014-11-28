var _curry3 = require('./_curry3');
var _path = require('./_path');


/**
 * Retrieve a nested path on an object separated by the specified
 * separator value.
 *
 * @func
 * @memberOf R
 * @category object
 * @sig String -> String -> {*} -> *
 * @param {String} sep The separator to use in `path`.
 * @param {String} path The path to use.
 * @return {*} The data at `path`.
 * @example
 *
 *      R.pathOn('/', 'a/b/c', {a: {b: {c: 3}}}); //=> 3
 */
module.exports = _curry3(function pathOn(sep, str, obj) {
    return _path(str.split(sep), obj);
});
