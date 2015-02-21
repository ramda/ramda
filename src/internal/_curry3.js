var __ = require('../__');
var _curry2 = require('./_curry2');
var _noArgsException = require('./_noArgsException');


/**
 * Optimized internal three-arity curry function.
 *
 * @private
 * @category Function
 * @param {Function} fn The function to curry.
 * @return {Function} The curried function.
 */
module.exports = function _curry3(fn) {
    return function f3(a, b, c) {
        var n = arguments.length;
        if (n === 0) {
            throw _noArgsException();
        } else if (n === 1 && a === __) {
            return f3;
        } else if (n === 1) {
            return _curry2(function(b, c) { return fn(a, b, c); });
        } else if (n === 2 && a === __ && b === __) {
            return f3;
        } else if (n === 2 && a === __) {
            return _curry2(function(a, c) { return fn(a, b, c); });
        } else if (n === 2 && b === __) {
            return _curry2(function(b, c) { return fn(a, b, c); });
        } else if (n === 2) {
            return function(c) { return fn(a, b, c); };
        } else if (n === 3 && a === __ && b === __ && c === __) {
            return f3;
        } else if (n === 3 && a === __ && b === __) {
            return _curry2(function(a, b) { return fn(a, b, c); });
        } else if (n === 3 && a === __ && c === __) {
            return _curry2(function(a, c) { return fn(a, b, c); });
        } else if (n === 3 && b === __ && c === __) {
            return _curry2(function(b, c) { return fn(a, b, c); });
        } else if (n === 3 && a === __) {
            return function f1(a) { return a === __ ? f1 : fn(a, b, c); };
        } else if (n === 3 && b === __) {
            return function f1(b) { return b === __ ? f1 : fn(a, b, c); };
        } else if (n === 3 && c === __) {
            return function f1(c) { return c === __ ? f1 : fn(a, b, c); };
        } else {
            return fn(a, b, c);
        }
    };
};
