var _symIterator = require('./_symIterator');


module.exports = function _isIterable(x) {
    return (x[_symIterator] != null) || (typeof x.next === 'function');
};
