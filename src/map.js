var _curry2 = require('./internal/_curry2');
var _dispatchable = require('./internal/_dispatchable');
var _keys = require('./internal/_keys');
var _map = require('./internal/_map');
var _reduce = require('./internal/_reduce');
var _xmap = require('./internal/_xmap');
var curryN = require('./curryN');


/**
 * Returns a new list, constructed by applying the supplied function to every element of the
 * supplied list.
 *
 * Note: `R.map` does not skip deleted or unassigned indices (sparse arrays), unlike the
 * native `Array.prototype.map` method. For more details on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map#Description
 *
 * Dispatches to the `map` method of the second argument, if present.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * Map treats also treats functions as functors and will compose them together.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig Functor f => (a -> b) -> f a -> f b
 * @param {Function} fn The function to be called on every element of the input `list`.
 * @param {Array} list The list to be iterated over.
 * @return {Array} The new list.
 * @see R.transduce
 * @example
 *
 *      var double = x => x * 2;
 *
 *      R.map(double, [1, 2, 3]); //=> [2, 4, 6]
 *
 *      R.map(double, {x: 1, y: 2, z: 3}); //=> {x: 2, y: 4, z: 6}
 */
module.exports = _curry2(_dispatchable('map', _xmap, function map(fn, functor) {
  switch (Object.prototype.toString.call(functor)) {
    case '[object Function]':
      return curryN(functor.length, function() {
        return fn.call(this, functor.apply(this, arguments));
      });
    case '[object Object]':
      return _reduce(function(acc, key) {
        acc[key] = fn(functor[key]);
        return acc;
      }, {}, _keys(functor));
    default:
      return _map(fn, functor);
  }
}));
