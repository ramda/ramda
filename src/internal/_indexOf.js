/**
 * Internal implementation of `indexOf`.
 * Returns the position of the first occurrence of an item in an array
 * (by strict equality),
 * or -1 if the item is not included in the array.
 *
 * @private
 * @param {Array} list The array to search
 * @param {*} item the item to find in the Array
 * @param {Number} from (optional) the index to start searching the Array
 * @return {Number} The index of the found item, or -1.
 *
 */
module.exports = function _indexOf(list, item, from) {
    var idx = 0, len = list.length;
    if (typeof from == 'number') {
        idx = from < 0 ? Math.max(0, len + from) : from;
    }
    while (idx < len) {
        if (list[idx] === item) {
            return idx;
        }
        ++idx;
    }
    return -1;
};
