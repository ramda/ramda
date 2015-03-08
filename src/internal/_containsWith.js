module.exports = function _containsWith(pred, x, list) {
    for (var idx = 0, len = list.length; idx < len; idx += 1) {
        if (pred(x, list[idx])) {
            return true;
        }
    }
    return false;
};
