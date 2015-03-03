module.exports = function _isIterable(x) {
    return typeof Symbol !== 'undefined' && x != null && typeof x[Symbol.iterator] === 'function';
};
