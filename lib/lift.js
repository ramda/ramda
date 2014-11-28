var _noArgsException = require('./_noArgsException');
var liftN = require('./liftN');


/**
 * "lifts" a function of arity > 1 so that it may "map over" an Array or
 * other Functor.
 *
 * @func
 * @memberOf R
 * @see R.liftN
 * @category Function
 * @sig (*... -> *) -> ([*]... -> [*])
 * @param {Function} fn The function to lift into higher context
 * @return {Function} The function `fn` applicable to mappable objects.
 * @example
 *
 *     var madd3 = R.lift(R.curryN(3, function(a, b, c) {
 *         return a + b + c;
 *     }));
 *     madd3([1,2,3], [1,2,3], [1]); //=> [3, 4, 5, 4, 5, 6, 5, 6, 7]
 *
 *     var madd5 = R.lift(R.curryN(5, function(a, b, c, d, e) {
 *         return a + b + c + d + e;
 *     }));
 *     madd5([1,2], [3], [4, 5], [6], [7, 8]); //=> [21, 22, 22, 23, 22, 23, 23, 24]
 */
module.exports = function lift(fn) {
    if (arguments.length === 0) {
        throw _noArgsException();
    }
    return liftN(fn.length, fn);
};
