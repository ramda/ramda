module.exports = function _filter(fn, list) {
    var idx = -1, len = list.length, result = [];
    while (++idx < len) {
        if (fn(list[idx])) {
            result.push(list[idx]);
        }
    }
    return result;
};
