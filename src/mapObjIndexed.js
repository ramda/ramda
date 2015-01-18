var _curry2 = require('./internal/_curry2');
var _foldl = require('./internal/_foldl');
var keys = require('./keys');


/**
 * Like `mapObj`, but but passes additional arguments to the predicate function. The
 * predicate function is passed three arguments: *(value, key, obj)*.
 *
 * @func
 * @memberOf R
 * @category List
 * @sig (v, k, {k: v} -> v) -> {k: v} -> {k: v}
 * @param {Function} fn A function called for each property in `obj`. Its return value will
 *        become a new property on the return object.
 * @param {Object} obj The object to iterate over.
 * @return {Object} A new object with the same keys as `obj` and values that are the result
 *         of running each property through `fn`.
 * @example
 *
 *      > var prependKeyAndDouble = function(num, key, obj) {
 *      .     return key + (num * 2);
 *      . }
 *      > R.mapObjIndexed(prependKeyAndDouble, {x: 1, y: 2, z: 3})
 *      {x: 'x2', y: 'y4', z: 'z6'}
 */
module.exports = _curry2(function mapObjectIndexed(fn, obj) {
    return _foldl(function(acc, key) {
        acc[key] = fn(obj[key], key, obj);
        return acc;
    }, {}, keys(obj));
});
