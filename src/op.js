var __ = require('./internal/__');
var _noArgsException = require('./internal/_noArgsException');
var binary = require('./binary');
var flip = require('./flip');
var lPartial = require('./lPartial');
var rPartial = require('./rPartial');
var unary = require('./unary');


/**
 * Uses a placeholder to convert a binary function into something like an infix operation.
 * When called with an `undefined` placeholder (e.g. `R.__`) the second argument is applied to the
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
 *      div(__, 3)(6); //=> 2 // note: `__` here is just an `undefined` value.  You could use `void 0` instead
 *      div(__)(3, 6); //=> 2
 *      div(__)(3)(6); //=> 2
 */
module.exports = function op(fn) {
    var length = fn.length;
    if (length !== 2) {throw new Error('Expected binary function.');}

    return function _op(a, b) {
        switch (arguments.length) {
            case 0: throw _noArgsException();
            case 1: return a === __ ? binary(flip(_op)) : unary(lPartial(fn, a));
            default: return a === __ ? unary(rPartial(fn, b)) : fn(a, b);
        }
    };
};
