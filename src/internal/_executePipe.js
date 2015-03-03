
module.exports = function _executePipe(fns, args) {
    var endIdx = fns.length - 1;
    var val = fns[0].apply(this, args);
    var idx = 0;
    while (idx++ < endIdx) {
        val = fns[idx].call(this, val);
    }
    return val;
};
