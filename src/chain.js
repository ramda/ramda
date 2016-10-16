var _curry2 = require('./internal/_curry2');
var _dispatchable = require('./internal/_dispatchable');
var _makeFlat = require('./internal/_makeFlat');
var _xchain = require('./internal/_xchain');
var map = require('./map');


/**
 * `chain` maps a function over a list and concatenates the results. `chain`
 * is also known as `flatMap` in some libraries
 *
 * Dispatches to the `chain` method of the second argument, if present,
 * according to the [FantasyLand Chain spec](https://github.com/fantasyland/fantasy-land#chain).
 * Treats the second argument as a FantasyLand Chain, when the the second argument is a function
 * of the form `a -> x -> b`.
 *
 * @func
 * @memberOf R
 * @since v0.3.0
 * @category List
 * @sig Chain m => (a -> m b) -> m a -> m b
 * @sig (x -> a) -> (a -> x -> b) -> (x -> b)
 * @param {Function} fn The function to map with
 * @param {Array} list The list to map over
 * @return {Array} The result of flat-mapping `list` with `fn`
 * @example
 *
 *      var duplicate = n => [n, n];
 *      R.chain(duplicate, [1, 2, 3]); //=> [1, 1, 2, 2, 3, 3]
 *
 *      var appendHead = R.chain(R.head, R.append);
 *      appendHead([1, 2, 3]); //=> [1, 2, 3, 1]
 */
module.exports = _curry2(_dispatchable('chain', _xchain, function chain(fn, monad) {
  if (typeof monad === 'function') {
    return function() {
      return monad.call(this, fn.apply(this, arguments)).apply(this, arguments);
    };
  }
  return _makeFlat(false)(map(fn, monad));
}));
