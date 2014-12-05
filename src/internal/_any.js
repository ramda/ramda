module.exports = function _any(fn, list) {
    var idx = -1;
    while (++idx < list.length) {
        if (fn(list[idx])) {
            return true;
        }
    }
    return false;
};
