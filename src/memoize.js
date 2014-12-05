var _foldl = require('./internal/_foldl');
var _slice = require('./internal/_slice');


/**
 * Creates a new function that, when invoked, caches the result of calling `fn` for a given
 * argument set and returns the result. Subsequent calls to the memoized `fn` with the same
 * argument set will not result in an additional call to `fn`; instead, the cached result
 * for that set of arguments will be returned.
 *
 * Note that this version of `memoize` effectively handles only string and number
 * parameters.  Also note that it does not work on variadic functions.
 *
 * @func
 * @memberOf R
 * @category Function
 * @sig (a... -> b) -> (a... -> b)
 * @param {Function} fn The function to be wrapped by `memoize`.
 * @return {Function}  Returns a memoized version of `fn`.
 * @example
 *
 *      var numberOfCalls = 0;
 *      var trackedAdd = function(a, b) {
 *        numberOfCalls += 1;
 *        return a + b;
 *      };
 *      var memoTrackedAdd = R.memoize(trackedAdd);
 *
 *      memoTrackedAdd(1, 2); //=> 3
 *      numberOfCalls; //=> 1
 *      memoTrackedAdd(1, 2); //=> 3
 *      numberOfCalls; //=> 1
 *      memoTrackedAdd(2, 3); //=> 5
 *      numberOfCalls; //=> 2
 *
 *      // Note that argument order matters
 *      memoTrackedAdd(2, 1); //=> 3
 *      numberOfCalls; //=> 3
 */
module.exports = function memoize(fn) {
    var cache = {};
    return function() {
        if (!arguments.length) {return;}
        var position = _foldl(function(cache, arg) {
            return cache[arg] || (cache[arg] = {});
        }, cache, _slice(arguments, 0, arguments.length - 1));
        var arg = arguments[arguments.length - 1];
        return (position[arg] || (position[arg] = fn.apply(this, arguments)));
    };
};
