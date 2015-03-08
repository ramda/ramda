var _curry2 = require('./internal/_curry2');


/**
 * Creates a new object out of a list of keys and a list of values.
 *
 * @func
 * @memberOf R
 * @category List
 * @sig [String] -> [*] -> {String: *}
 * @param {Array} keys The array that will be properties on the output object.
 * @param {Array} values The list of values on the output object.
 * @return {Object} The object made by pairing up same-indexed elements of `keys` and `values`.
 * @example
 *
 *      R.zipObj(['a', 'b', 'c'], [1, 2, 3]); //=> {a: 1, b: 2, c: 3}
 */
module.exports = _curry2(function zipObj(keys, values) {
    var result = {};
    for (var idx = 0, len = keys.length; idx < len; idx += 1) {
        result[keys[idx]] = values[idx];
    }
    return result;
});
