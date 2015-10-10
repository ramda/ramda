var _curry2 = require('./internal/_curry2');
var _reduce = require('./internal/_reduce');
var keys = require('./keys');


/**
 * Like `mapObj`, but passes additional arguments to the predicate function. The
 * predicate function is passed three arguments: *(value, key, obj)*.
 *
 * @func
 * @memberOf R
 * @since v0.9.0
 * @category Object
 * @sig (v, k, {k: v} -> v) -> {k: v} -> {k: v}
 * @param {Function} fn A function called for each property in `obj`. Its return value will
 *        become a new property on the return object.
 * @param {Object} obj The object to iterate over.
 * @return {Object} A new object with the same keys as `obj` and values that are the result
 *         of running each property through `fn`.
 * @example
 *
 *      var values = { x: 1, y: 2, z: 3 };
 *      var prependKeyAndDouble = (num, key, obj) => key + (num * 2);
 *
 *      R.mapObjIndexed(prependKeyAndDouble, values); //=> { x: 'x2', y: 'y4', z: 'z6' }
 */
module.exports = _curry2(function mapObjIndexed(fn, obj) {
  return _reduce(function(acc, key) {
    acc[key] = fn(obj[key], key, obj);
    return acc;
  }, {}, keys(obj));
});
