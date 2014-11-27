module.exports = function _foldl(fn, acc, list) {
    var idx = -1, len = list.length;
    while (++idx < len) {
        acc = fn(acc, list[idx]);
    }
    return acc;
};
