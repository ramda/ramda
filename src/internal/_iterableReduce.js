var _symIterator = require('./_symIterator');


module.exports = function _iterableReduce(xf, acc, iter) {
    if (iter[_symIterator]) {
        iter = iter[_symIterator]();
    }
    var step = iter.next();
    while (!step.done) {
        acc = xf.step(acc, step.value);
        if (acc && acc.__transducers_reduced__) {
            acc = acc.value;
            break;
        }
        step = iter.next();
    }
    return xf.result(acc);
};
