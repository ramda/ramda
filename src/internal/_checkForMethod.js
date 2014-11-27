var _isArray = require('./_isArray');


/**
 * Similar to hasMethod, this checks whether a function has a [methodname]
 * function. If it isn't an array it will execute that function otherwise it will
 * default to the ramda implementation.
 *
 * @private
 * @param {Function} fn ramda implemtation
 * @param {String} methodname property to check for a custom implementation
 * @return {Object} Whatever the return value of the method is.
 */
module.exports = function _checkForMethod(methodname, fn) {
    return function(a, b, c) {
        var length = arguments.length;
        var obj = arguments[length - 1],
            callBound = obj && !_isArray(obj) && typeof obj[methodname] === 'function';
        switch (arguments.length) {
            case 0: return fn();
            case 1: return callBound ? obj[methodname]() : fn(a);
            case 2: return callBound ? obj[methodname](a) : fn(a, b);
            case 3: return callBound ? obj[methodname](a, b) : fn(a, b, c);
        }
    };
};
