var _concat = require('./internal/_concat');
var _curry1 = require('./internal/_curry1');
var curryN = require('./curryN');
var keys = require('./keys');
var _isArray = require('./internal/_isArray');


/**
 * Creates a new collection iteration function from an existing one by adding two
 * new parameters to its callback function: the current index, and the entire collection.
 *
 * This would turn, for instance, Ramda's simple `map` function into one that
 * more closely resembles `Array.prototype.map`, yet similarly supporting objects.
 * Note that this will only work for functions in which the iteration callback
 * function is the first parameter, and where the collection is the last parameter.
 * (This latter might be unimportant if the collection parameter is not used.)
 *
 * @func
 * @memberOf R
 * @since v0.24.0
 * @category Function
 * @category Object
 * @sig ((a ... -> b) ... -> [a] -> *) -> (a ..., Int | String, [a] -> b) ... -> [a] -> *)
 * @param {Function} fn A collection iteration function that does not pass index or collection to its callback
 * @return {Function} An altered collection iteration function that passes (item, index, coll) to its callback
 * @example
 *
 *      var mapKeyed = R.addKey(R.map);
 *      mapKeyed((val, idx) => idx + '-' + val, ['f', 'o', 'o', 'b', 'a', 'r']);
 *      //=> ['0-f', '1-o', '2-o', '3-b', '4-a', '5-r']
 *      mapKeyed((val, k) => k + '-' + val, { a: 1, b: 2 });
 *      //=> { a: 'a-1', b: 'a-2' }
 */
module.exports = _curry1(function addKey(fn) {
  return curryN(fn.length, function() {
    var idx = 0;
    var origFn = arguments[0];
    var coll = arguments[arguments.length - 1];
    var ks = keys(coll);
    var len = coll.length;
    var likeArray = _isArray(coll) || len === 0 || (len > 0 && coll.hasOwnProperty(0) && coll.hasOwnProperty(coll.length - 1));
    var args = Array.prototype.slice.call(arguments, 0);
    args[0] = function() {
      var key = likeArray ? idx : ks[idx];
      var result = origFn.apply(this, _concat(arguments, [key, coll]));
      idx += 1;
      return result;
    };
    return fn.apply(this, args);
  });
});
