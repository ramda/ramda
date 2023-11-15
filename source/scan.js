import _curry3 from './internal/_curry3.js';
import _dispatchable from './internal/_dispatchable.js';
import _xscan from './internal/_xscan.js';


/**
 * Scan is similar to [`reduce`](#reduce), but returns a list of successively
 * reduced values from the left.
 *
 * Acts as a transducer if a transformer is given in list position.
 *
 * @func
 * @memberOf R
 * @since v0.10.0
 * @category List
 * @sig ((a, b) -> a) -> a -> [b] -> [a]
 * @param {Function} fn The iterator function. Receives two values, the accumulator and the
 *        current element from the array
 * @param {*} acc The accumulator value.
 * @param {Array} list The list to iterate over.
 * @return {Array} A list of all intermediately reduced values.
 * @see R.reduce, R.mapAccum
 * @example
 *
 *      const numbers = [1, 2, 3, 4];
 *      const factorials = R.scan(R.multiply, 1, numbers); //=> [1, 1, 2, 6, 24]
 * @symb R.scan(f, a, [b, c]) = [a, f(a, b), f(f(a, b), c)]
 */
var scan = _curry3(_dispatchable([], _xscan, function scan(fn, acc, list) {
  var idx = 0;
  var len = list.length;
  var result = Array(len + 1);
  result[0] = acc;
  while (idx < len) {
    acc = fn(acc, list[idx]);
    result[idx + 1] = acc;
    idx += 1;
  }
  return result;
}));
export default scan;
