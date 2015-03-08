/**
 * Private `concat` function to merge two array-like objects.
 *
 * @private
 * @param {Array|Arguments} [set1=[]] An array-like object.
 * @param {Array|Arguments} [set2=[]] An array-like object.
 * @return {Array} A new, merged array.
 * @example
 *
 *      _concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
 */
module.exports = function _concat(set1, set2) {
    set1 = set1 || [];
    set2 = set2 || [];
    var result = [];
    for (var idx = 0, len = set1.length; idx < len; idx += 1) {
        result.push(set1[idx]);
    }
    for (idx = 0, len = set2.length; idx < len; idx += 1) {
        result.push(set2[idx]);
    }
    return result;
};
