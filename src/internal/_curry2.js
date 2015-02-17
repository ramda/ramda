var __ = require('../__');
var _noArgsException = require('./_noArgsException');


/**
 * Optimized internal two-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */
module.exports = function _curry2(fn) {
    return function f2(a, b) {
        var n = arguments.length;
        if (n === 0) {
            throw _noArgsException();
        } else if (n === 1 && a === __) {
            return f2;
        } else if (n === 1) {
            return function f1(b) { return b === __ ? f1 : fn(a, b); };
        } else if (n === 2 && a === __ && b === __) {
            return f2;
        } else if (n === 2 && a === __) {
            return function f1(a) { return a === __ ? f1 : fn(a, b); };
        } else if (n === 2 && b === __) {
            return function f1(b) { return b === __ ? f1 : fn(a, b); };
        } else {
            return fn(a, b);
        }
    };
};
