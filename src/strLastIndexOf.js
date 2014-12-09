var _curry2 = require('./internal/_curry2');


/**
 *
 * Finds the last index of a substring in a string, returning -1 if it's not present
 *
 * @func
 * @memberOf R
 * @category String
 * @sig String -> String -> Number
 * @param {String} c A string to find.
 * @param {String} str The string to search in
 * @return {Number} The last index of `c` or -1 if not found.
 * @example
 *
 *      R.strLastIndexOf('a', 'banana split'); //=> 5
 */
module.exports = _curry2(function(c, str) {
    return str.lastIndexOf(c);
});
