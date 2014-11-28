var _curry2 = require('./_curry2');
var keys = require('./keys');
var reduce = require('./reduce');


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
 * @alias mapObj.idx
 * @example
 *
 *      var values = { x: 1, y: 2, z: 3 };
 *      var prependKeyAndDouble = function(num, key, obj) {
 *        return key + (num * 2);
 *      };
 *
 *      R.mapObj.idx(prependKeyAndDouble, values); //=> { x: 'x2', y: 'y4', z: 'z6' }
 */
module.exports = _curry2(function mapObjectIdx(fn, obj) {
    return reduce(function(acc, key) {
        acc[key] = fn(obj[key], key, obj);
        return acc;
    }, {}, keys(obj));
});
