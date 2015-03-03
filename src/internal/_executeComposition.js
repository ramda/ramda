
module.exports = function _executeComposition(fns, args) {
    var startIdx = fns.length - 1;
    var val = fns[startIdx].apply(this, args);
    var idx = startIdx;
    while (idx--) {
        val = fns[idx].call(this, val);
    }
    return val;
};
