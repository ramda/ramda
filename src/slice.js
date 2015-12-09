var _checkForMethod = require('./internal/_checkForMethod');
var _curry3 = require('./internal/_curry3');
var _isGenerator = require('./internal/_isGenerator');


/**
 * Returns the elements of the given list or string (or object with a `slice`
 * method) from `fromIndex` (inclusive) to `toIndex` (exclusive).
 *
 * Dispatches to the `slice` method of the third argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.1.4
 * @category List
 * @sig Number -> Number -> [a] -> [a]
 * @sig Number -> Number -> String -> String
 * @param {Number} fromIndex The start index (inclusive).
 * @param {Number} toIndex The end index (exclusive).
 * @param {*} list
 * @return {*}
 * @example
 *
 *      R.slice(1, 3, ['a', 'b', 'c', 'd']);        //=> ['b', 'c']
 *      R.slice(1, Infinity, ['a', 'b', 'c', 'd']); //=> ['b', 'c', 'd']
 *      R.slice(0, -1, ['a', 'b', 'c', 'd']);       //=> ['a', 'b', 'c']
 *      R.slice(-3, -1, ['a', 'b', 'c', 'd']);      //=> ['b', 'c']
 *      R.slice(0, 3, 'ramda');                     //=> 'ram'
 */
module.exports = _curry3(_checkForMethod('slice', function slice(fromIndex, toIndex, list) {
  if (_isGenerator(list)) {
    return function* sliceGenerator() {
      const iter = list();
      let item;

      for (let i = 0; i < fromIndex; i += 1) {
        item = iter.next();
        if (item.done) {
          return;
        }
      }

      for (let i = fromIndex; i < toIndex; i += 1) {
        item = iter.next();
        if (item.done) {
          return;
        }
        yield item.value;
      }
    };
  } else {
    return Array.prototype.slice.call(list, fromIndex, toIndex);
  }
}));
