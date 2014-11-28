/**
 * Private `concat` function to merge two array-like objects.
 *
 * @private
 * @category Internal
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
    var idx;
    var len1 = set1.length;
    var len2 = set2.length;
    var result = new Array(len1 + len2);

    idx = -1;
    while (++idx < len1) {
        result[idx] = set1[idx];
    }
    idx = -1;
    while (++idx < len2) {
        result[len1 + idx] = set2[idx];
    }
    return result;
};
