var _curry2 = require('./_curry2');
var _map = require('./_map');
var _noArgsException = require('./_noArgsException');
var _slice = require('./_slice');
var ap = require('./ap');
var curryN = require('./curryN');
var reduce = require('./reduce');


/**
 * "lifts" a function to be the specified arity, so that it may "map over" that many
 * lists (or other Functors).
 *
 * @func
 * @memberOf R
 * @see R.lift
 * @category Function
 * @sig Number -> (*... -> *) -> ([*]... -> [*])
 * @param {Function} fn The function to lift into higher context
 * @return {Function} The function `fn` applicable to mappable objects.
 * @example
 *
 *     var madd3 = R.liftN(3, R.curryN(3, function() {
 *         return R.foldl(R.add, 0, arguments);
 *     }));
 *     madd3([1,2,3], [1,2,3], [1]); //=> [3, 4, 5, 4, 5, 6, 5, 6, 7]
 */
module.exports = _curry2(function liftN(arity, fn) {
    var lifted = curryN(arity, fn);
    if (arguments.length === 0) {
        throw _noArgsException();
    }
    return curryN(arity, function() {
        return reduce(ap, _map(lifted, arguments[0]), _slice(arguments, 1));
    });
});
