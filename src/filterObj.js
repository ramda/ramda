var _curry2 = require('./internal/_curry2');
var keys = require('./keys');


/**
 * Returns a new object containing only those key-value pairs of which the
 * values match a given predicate function.
 * The predicate function is passed one argument: *(value)*.
 *
 * @func
 * @memberOf R
 * @category Object
 * @sig (a -> Boolean) -> {String, a} -> {String, a}
 * @param {Function} fn The function called per key.
 * @param {Object} obj The object to iterate over the keys.
 * @return {Object} The new filtered object.
 * @example
 *
 *      var isPositive = function(n) {
 *        return n > 0;
 *      };
 *      R.filterObj(isPositive, {a: 1, b: 2, c: -1, d: 0, e: 5}); //=> {a: 1, b: 2, e: 5}
 *
 *      var colors = {1: {color: 'red'}, 2: {color: 'black', bgcolor: 'yellow'}};
 *      R.filterObj(has('bgcolor'), colors); //=> {2: {color: 'black', bgcolor: 'yellow'}}
 */
module.exports = _curry2(function filterObj(fn, obj) {
  var result = {}, ks = keys(obj), idx = ks.length;
  while (--idx >= 0) {
    if (fn(obj[ks[idx]])) {
      result[ks[idx]] = obj[ks[idx]];
    }
  }
  return result;
});
