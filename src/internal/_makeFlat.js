var isArrayLike = require('../isArrayLike');


/**
 * `_makeFlat` is a helper function that returns a one-level or fully recursive function
 * based on the flag passed in.
 *
 * @private
 */
module.exports = function _makeFlat(recursive) {
    return function flatt(list) {
        var result = [];
        for (var idx = 0, len = list.length; idx < len; idx += 1) {
            if (isArrayLike(list[idx])) {
                var value = recursive ? flatt(list[idx]) : list[idx];
                for (var idx2 = 0, len2 = value.length; idx2 < len2; idx2 += 1) {
                    result.push(value[idx2]);
                }
            } else {
                result.push(list[idx]);
            }
        }
        return result;
    };
};
