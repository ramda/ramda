module.exports = function _some(fn, list) {
    var idx = -1;
    while (++idx < list.length) {
        if (fn(list[idx])) {
            return true;
        }
    }
    return false;
};
