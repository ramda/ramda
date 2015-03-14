var _iterable = require('./_iterable');
var _symbolIterator = require('./_symbolIterator');
var _xwrap = require('./_xwrap');
var bind = require('../bind');
var isArrayLike = require('../isArrayLike');


module.exports = (function() {
    function _arrayReduce(xf, acc, list) {
        var idx = -1, len = list.length;
        while (++idx < len) {
            acc = xf.step(acc, list[idx]);
            if (acc && acc.__transducers_reduced__) {
                acc = acc.value;
                break;
            }
        }
        return xf.result(acc);
    }

    function _iterableReduce(xf, acc, iter) {
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
    }

    function _methodReduce(xf, acc, obj) {
        return xf.result(obj.reduce(bind(xf.step, xf), acc));
    }

    return function _reduce(fn, acc, list) {
        if (typeof fn === 'function') {
            fn = _xwrap(fn);
        }
        if (isArrayLike(list)) {
            return _arrayReduce(fn, acc, list);
        }
        if (typeof list.reduce === 'function') {
            return _methodReduce(fn, acc, list);
        }
        return _iterableReduce(fn, acc, _iterable(list)[_symbolIterator]());
    };
})();
