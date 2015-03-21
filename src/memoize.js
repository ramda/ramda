var _curry1 = require('./internal/_curry1');
var _has = require('./internal/_has');
var _map = require('./internal/_map');


/**
 * Creates a new function that, when invoked, caches the result of calling `fn` for a given
 * argument set and returns the result. Subsequent calls to the memoized `fn` with the same
 * argument set will not result in an additional call to `fn`; instead, the cached result
 * for that set of arguments will be returned.
 *
 * Note that this version of `memoize` should not be applied to functions which
 * take objects as arguments.
 *
 * @func
 * @memberOf R
 * @category Function
 * @sig (*... -> a) -> (*... -> a)
 * @param {Function} fn The function to memoize.
 * @return {Function} Memoized version of `fn`.
 * @example
 *
 *      var count = 0;
 *      var factorial = R.memoize(function(n) {
 *        count += 1;
 *        return R.product(R.range(1, n + 1));
 *      });
 *      factorial(5); //=> 120
 *      factorial(5); //=> 120
 *      factorial(5); //=> 120
 *      count; //=> 1
 */
module.exports = (function() {
  // Returns a string representation of the given value suitable for use as
  // a property name.
  //
  // > repr(42)
  // '42::[object Number]'
  var repr = function(x) {
    return x + '::' + Object.prototype.toString.call(x);
  };

  // Serializes an array-like object. The approach is similar to that taken
  // by [CANON](https://github.com/davidchambers/CANON), though it does not
  // differentiate between objects at all (!) and, since it is not applied
  // recursively, does not distinguish between [[42]] and [['42']].
  //
  // > serialize(['foo', 42])
  // '2:{foo::[object String],42::[object Number]}'
  var serialize = function(args) {
    return args.length + ':{' + _map(repr, args).join(',') + '}';
  };

  return _curry1(function memoize(fn) {
    var cache = {};
    return function() {
      var key = serialize(arguments);
      if (!_has(key, cache)) {
        cache[key] = fn.apply(this, arguments);
      }
      return cache[key];
    };
  });
}());
