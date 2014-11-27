var _ap = require('./internal/_ap');
var _curry2 = require('./internal/_curry2');
var _foldl = require('./internal/_foldl');
var _map = require('./internal/_map');
var _noArgsException = require('./internal/_noArgsException');
var _slice = require('./internal/_slice');
var curryN = require('./curryN');


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
        return _foldl(_ap, _map(lifted, arguments[0]), _slice(arguments, 1));
    });
});
