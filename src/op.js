var __ = require('./__');
var _noArgsException = require('./internal/_noArgsException');
var flip = require('./flip');
var lPartial = require('./lPartial');


/**
 * Uses a placeholder to convert a binary function into something like an infix operation.
 * When called with the `R.__` placeholder the second argument is applied to the
 * second position, and it returns a function waiting for its first argument.
 * This can allow for more natural processing of functions which are really binary operators.
 *
 * @func
 * @memberOf R
 * @category Function
 * @param {Function} fn The binary operation to adjust
 * @return {Function} A new function that acts somewhat like an infix operator.
 * @example
 *
 *      var div = R.op(function (a, b) {
 *          return a / b;
 *      });
 *
 *      div(6, 3); //=> 2
 *      div(6)(3); //=> 2
 *      div(R.__, 3)(6); //=> 2
 *      div(R.__)(3, 6); //=> 2
 *      div(R.__)(3)(6); //=> 2
 */
module.exports = function op(fn) {
    if (fn.length !== 2) {
        throw new Error('Expected binary function.');
    }
    return function _op(a, b) {
        switch (arguments.length) {
            case 0: throw _noArgsException();
            case 1: return a === __ ? flip(_op) : lPartial(fn, a);
            default: return a === __ ? flip(fn)(b) : fn(a, b);
        }
    };
};
