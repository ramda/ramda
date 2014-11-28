/**
 * Returns a function which returns its nth argument.
 *
 * @func
 * @memberOf R
 * @category Core
 * @sig Number -> *... -> *
 * @param {Number} n
 * @return {Function}
 * @example
 *
 *      R.argN(1)('a', 'b', 'c'); //=> 'b'
 */
module.exports = function argN(n) {
    return function() {
        return arguments[n];
    };
};
