module.exports = function _all(fn, list) {
    for (var idx = 0, len = list.length; idx < len; idx += 1) {
        if (!fn(list[idx])) {
            return false;
        }
    }
    return true;
};
