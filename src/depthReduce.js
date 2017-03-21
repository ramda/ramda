var _curry3 = require('./internal/_curry3');
var equals = require('./equals');
var keys = require('./keys');


/**
 * Returns a single item by running a depth-first iteration through a given multi-dimensional
 * iterable (list, object, nested objects and arrays or cyclic object), successively calling
 * the iterator function and passing it an accumulator value, the current
 * value from the iterable, the key where the current value is stored in the iterable,
 * a list with the keys of the parent iterables of the current position,
 * and then passing the result to the next call.
 *
 * The iterator function receives four values: *(acc, value, key, parentsKeys)*.
 * It's expected that the iterator returns it's results wrapped in an array, of which only
 * the first position is considered. If the iterator returns an empty array, depthReduce
 * immediately stops, returning the last non-empty result.
 *
 * Note: `R.depthReduce` does not skip deleted or unassigned indices (sparse
 * arrays), unlike the native `Array.prototype.reduce` method. For more details
 * on this behavior, see:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Description
 *
 * @func
 * @memberOf R
 * @category List
 * @sig (a,v,k,parentKeys -> [a]) -> a -> [{...}] -> a
 * @param {Function} fn is the iterator function. It receives four values,
 *        the accumulator, the value of the element being iterated,
 *        the the key of the element being iterated, and an array of the parents
 *        of the iterated elements.
 * @param {*} acc The accumulator value.
 * @param {Object} The deep array or object that it's going to be iterated.
 * @return {*} The final, accumulated value.
 * @see R.reduce, R.reduced, R.addIndex, R.reduceRight
 * @example
 *
 *      var powerUntil = R.curry(function(max, a, v) {
 *        if (a >= max) { return []; }
 *        return [typeof v === 'number' ? Math.pow(a, v) : a];
 *      });
 *
 *      R.depthReduce(powerUntil(10), 2, [2, 2, 2]) // ((2 ^ 2) ^ 2) = 16
 *
 *      R.depthReduce(powerUntil(10), 2, [2, [2, [2]]]) // ((2 ^ 2) ^ 2) = 16
 *
 *      R.depthReduce(powerUntil(10), 2, { a: 1, b: [2, { c: 3 }]}) // (((2 ^ 1) ^ 2) ^ 3) = 64
 *
 *      R.depthReduce(powerUntil(10), 2, [[[1], 2], 3, 4]) // (((2 ^ 1) ^ 2) ^ 3) = 64
 *
 */
module.exports = _curry3(function depthReduce(reducer, accumulator, target) {
  var accepted = accumulator;
  var levels = [{
    target: target,
    keys: keys(target),
    path: []
  }];
  var empty = [];

  while (levels.length > 0) {
    var level = levels.length - 1;
    var env = levels[level];
    if (!env.keys.length) {
      levels = levels.slice(0, -1);
      continue;
    }
    var key = env.keys.shift();
    var value = env.target[key];
    var result = reducer(accepted, value, key, env.path);
    if (equals(result, empty)) {
      return accepted;
    }
    accepted = (result && result.length) ? result[0] : result;
    if (typeof value === 'object') {
      levels.push({
        target: value,
        keys: keys(value),
        path: env.path.concat(key)
      });
    }
  }

  return accepted;
});
