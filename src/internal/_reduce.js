var _arrayReduce = require('./_arrayReduce');
var _isIterable = require('./_isIterable');
var _iterableReduce = require('./_iterableReduce');
var _xwrap = require('./_xwrap');
var isArrayLike = require('../isArrayLike');


module.exports = function _reduce(fn, acc, list) {
    if (typeof fn === 'function') {
        fn = _xwrap(fn);
    }
    if (isArrayLike(list)) {
        return _arrayReduce(fn, acc, list);
    }
    if (_isIterable(list)) {
        return _iterableReduce(fn, acc, list);
    }
    throw new TypeError('reduce: list must be array or iterable');
};
