module.exports = function _arrayReduce(xf, acc, list) {
    var idx = -1, len = list.length;
    while (++idx < len) {
        acc = xf.step(acc, list[idx]);
        if (acc && acc.__transducers_reduced__) {
            acc = acc.value;
            break;
        }
    }
    return xf.result(acc);
};
