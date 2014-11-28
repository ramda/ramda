var _concat = require('./_concat');
var _curry2 = require('./_curry2');
var _hasMethod = require('./_hasMethod');
var _map = require('./_map');
var reduce = require('./reduce');


/**
 * ap applies a list of functions to a list of values.
 *
 * @func
 * @memberOf R
 * @category Function
 * @sig [f] -> [a] -> [f a]
 * @param {Array} fns An array of functions
 * @param {Array} vs An array of values
 * @return {Array} The value of applying each the function `fns` to each value in `vs`.
 * @example
 *
 *      R.ap([R.multiply(2), R.add(3)], [1,2,3]); //=> [2, 4, 6, 4, 5, 6]
 */
module.exports = _curry2(function ap(fns, vs) {
    return _hasMethod('ap', fns) ? fns.ap(vs) : reduce(function(acc, fn) {
        return _concat(acc, _map(fn, vs));
    }, [], fns);
});
