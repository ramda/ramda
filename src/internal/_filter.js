module.exports = function _filter(fn, list) {
    var result = [];
    for (var idx = 0, len = list.length; idx < len; idx += 1) {
        if (fn(list[idx])) {
            result.push(list[idx]);
        }
    }
    return result;
};
