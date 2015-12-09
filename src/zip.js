var _curry2 = require('./internal/_curry2');
var _isGenerator = require('./internal/_isGenerator');
var take = require('./take');


/**
 * Creates a new list out of the two supplied by pairing up equally-positioned
 * items from both lists. The returned list is truncated to the length of the
 * shorter of the two input lists.
 * Note: `zip` is equivalent to `zipWith(function(a, b) { return [a, b] })`.
 *
 * @func
 * @memberOf R
 * @since v0.1.0
 * @category List
 * @sig [a] -> [b] -> [[a,b]]
 * @param {Array} list1 The first array to consider.
 * @param {Array} list2 The second array to consider.
 * @return {Array} The list made by pairing up same-indexed elements of `list1` and `list2`.
 * @example
 *
 *      R.zip([1, 2, 3], ['a', 'b', 'c']); //=> [[1, 'a'], [2, 'b'], [3, 'c']]
 */
module.exports = _curry2(function zip(a, b) {
  if (_isGenerator(a) && _isGenerator(b)) {
    return function* zipGenerator() {
      let iter1 = a();
      let iter2 = b();

      while (true) {
        const p = iter1.next();
        const q = iter2.next();

        if (p.done || q.done) {
          break;
        }

        yield [p.value, q.value];
      }
    };
  } else {
    if (_isGenerator(a)) {
      a = take(b.length, a);
    } else if (_isGenerator(b)) {
      b = take(a.length, b);
    }

    var rv = [];
    var idx = 0;
    var len = Math.min(a.length, b.length);
    while (idx < len) {
      rv[idx] = [a[idx], b[idx]];
      idx += 1;
    }
    return rv;
  }
});
