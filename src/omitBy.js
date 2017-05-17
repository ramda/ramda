var _curry2 = require('./internal/_curry2');
var complement = require('./complement');
var pickBy = require('./pickBy');

/**
 * Returns a partial copy of an object omitting the keys that
 * satisfy the supplied predicate.
 *
 * @func
 * @memberOf R
 * @category Object
 * @sig ((a, String, {String: *}) -> Boolean) -> {String: *} -> {String: *}
 * @param {Function} pred A predicate to determine whether or not a key
 *        should be excluded from the output object.
 * @param {Object} obj The object to copy from
 * @return {Object} A new object with excluded properties.
 * @example
 *
 *   var isPositive = function(n) { return n > 0; };
 *   R.omitBy(isPositive, {a: -1, b: 0, c: 1, d: 2}); //=> {a: -1, b: 0}
 */

module.exports = _curry2(function omitBy(test, obj) {
  return pickBy(complement(test), obj);
});
