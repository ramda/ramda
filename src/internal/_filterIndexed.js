module.exports = function _filterIndexed(fn, list) {
    var result = [];
    for (var idx = 0, len = list.length; idx < len; idx += 1) {
        if (fn(list[idx], idx, list)) {
            result.push(list[idx]);
        }
    }
    return result;
};
