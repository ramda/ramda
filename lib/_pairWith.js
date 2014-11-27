/**
 * @private
 * @param {Function} fn The strategy for extracting keys from an object
 * @return {Function} A function that takes an object and returns an array of
 *         key-value arrays.
 */
function _pairWith(fn) {
    return function(obj) {
        return _map(function(key) { return [key, obj[key]]; }, fn(obj));
    };
}
