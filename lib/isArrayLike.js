var _isArray = require('./_isArray');


/**
 * Tests whether or not an object is similar to an array.
 *
 * @func
 * @memberOf R
 * @category Type
 * @category List
 * @param {*} x The object to test.
 * @return {Boolean} `true` if `x` has a numeric length property and extreme indices defined; `false` otherwise.
 * @example
 *
 *      R.isArrayLike([]); //=> true
 *      R.isArrayLike(true); //=> false
 *      R.isArrayLike({}); //=> false
 *      R.isArrayLike({length: 10}); //=> false
 *      R.isArrayLike({0: 'zero', 9: 'nine', length: 10}); //=> true
 */
module.exports = function isArrayLike(x) {
    if (_isArray(x)) { return true; }
    if (!x) { return false; }
    if (typeof x !== 'object') { return false; }
    if (x instanceof String) { return false; }
    if (x.nodeType === 1) { return !!x.length; }
    if (x.length === 0) { return true; }
    if (x.length > 0) {
        return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1);
    }
    return false;
};
