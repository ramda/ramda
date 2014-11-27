/**
 * Tests whether or not an object is an array.
 *
 * @private
 * @category Internal
 * @param {*} val The object to test.
 * @return {Boolean} `true` if `val` is an array, `false` otherwise.
 * @example
 *
 *      _isArray([]); //=> true
 *      _isArray(null); //=> false
 *      _isArray({}); //=> false
 */
var _isArray = Array.isArray || function isArray(val) {
    return val != null && val.length >= 0 && toString.call(val) === '[object Array]';
};
