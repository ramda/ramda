module.exports = function _all(fn, list) {
    var idx = -1;
    while (++idx < list.length) {
        if (!fn(list[idx])) {
            return false;
        }
    }
    return true;
};
