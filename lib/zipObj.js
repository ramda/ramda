var _curry2 = require('./_curry2');


/**
 * Creates a new object out of a list of keys and a list of values.
 *
 * @func
 * @memberOf R
 * @category List
 * @sig k -> v -> {k: v}
 * @param {Array} keys The array that will be properties on the output object.
 * @param {Array} values The list of values on the output object.
 * @return {Object} The object made by pairing up same-indexed elements of `keys` and `values`.
 * @example
 *
 *      R.zipObj(['a', 'b', 'c'], [1, 2, 3]); //=> {a: 1, b: 2, c: 3}
 */
module.exports = _curry2(function zipObj(keys, values) {
    var idx = -1, len = keys.length, out = {};
    while (++idx < len) {
        out[keys[idx]] = values[idx];
    }
    return out;
});
