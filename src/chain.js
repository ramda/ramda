var _curry2 = require('./internal/_curry2');
var _dispatchable = require('./internal/_dispatchable');
var _xchain = require('./internal/_xchain');
var map = require('./map');
var unnest = require('./unnest');


/**
 * `chain` maps a function over a list and concatenates the results.
 * This implementation is compatible with the
 * Fantasy-land Chain spec, and will work with types that implement that spec.
 * `chain` is also known as `flatMap` in some libraries
 *
 * @func
 * @memberOf R
 * @category List
 * @sig (a -> [b]) -> [a] -> [b]
 * @param {Function} fn
 * @param {Array} list
 * @return {Array}
 * @example
 *
 *      var duplicate = function(n) {
 *        return [n, n];
 *      };
 *      R.chain(duplicate, [1, 2, 3]); //=> [1, 1, 2, 2, 3, 3]
 */
module.exports = _curry2(_dispatchable('chain', _xchain, function chain(fn, list) {
  return unnest(map(fn, list));
}));
