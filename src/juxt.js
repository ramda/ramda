var __ = require('./__');
var _curry1 = require('./internal/_curry1');
var apply = require('./apply');
var map = require('./map');


/**
 * juxt applies a list of functions to a list of values.
 *
 * @func
 * @memberOf R
 * @since 0.19.1
 * @since 0.19.0
 * @category Function
 * @sig [(a, b, ..., m) -> n] -> ((a, b, ..., m) -> [n])
 * @param {Array} fns An array of functions
 * @return {Function} A function that returns a list of values after applying each of the original `fns` to its parameters.
 * @example
 *
 *      var range = R.juxt([Math.min, Math.max]);
 *      range(3, 4, 9, -3); //=> [-3, 9]
 */
module.exports = _curry1(function juxt(fns) {
  return function() {
    return map(apply(__, arguments), fns);
  };
});
