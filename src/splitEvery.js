var _curry2 = require('./internal/_curry2');
var _isGenerator = require('./internal/_isGenerator');
var slice = require('./slice');


/**
 * Splits a collection into slices of the specified length.
 *
 * @func
 * @memberOf R
 * @since v0.16.0
 * @category List
 * @sig Number -> [a] -> [[a]]
 * @sig Number -> String -> [String]
 * @param {Number} n
 * @param {Array} list
 * @return {Array}
 * @example
 *
 *      R.splitEvery(3, [1, 2, 3, 4, 5, 6, 7]); //=> [[1, 2, 3], [4, 5, 6], [7]]
 *      R.splitEvery(3, 'foobarbaz'); //=> ['foo', 'bar', 'baz']
 */
module.exports = _curry2(function splitEvery(n, list) {
  if (_isGenerator(list)) {
    return function* splitEveryGenerator() {
      const iter = list();
      let iterComplete = false;
      while (true) {
        const arr = [];
        for (let i = 0; i < n; i += 1) {
          const item = iter.next();
          if (item.done) {
            iterComplete = true;
            break;
          }
          arr.push(item.value);
        }
        yield arr;

        if (iterComplete) {
          break;
        }
      }
    };
  } else {
    if (n <= 0) {
      throw new Error('First argument to splitEvery must be a positive integer');
    }
    var result = [];
    var idx = 0;
    while (idx < list.length) {
      result.push(slice(idx, idx += n, list));
    }
    return result;
  }
});
