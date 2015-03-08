module.exports = function _reduce(fn, acc, list) {
    var result = acc;
    for (var idx = 0, len = list.length; idx < len; idx += 1) {
        result = fn(result, list[idx]);
    }
    return result;
};
