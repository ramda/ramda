import _checkForMethod from './internal/_checkForMethod.js';
import _curry2 from './internal/_curry2.js';


/**
 * Creates a new list with the separator interposed between elements.
 *
 * Dispatches to the `intersperse` method of the second argument, if present.
 *
 * @func
 * @memberOf R
 * @since v0.14.0
 * @category List
 * @sig a -> [a] -> [a]
 * @param {*} separator The element to add to the list.
 * @param {Array} list The list to be interposed.
 * @return {Array} The new list.
 * @example
 *
 *      R.intersperse('a', ['b', 'n', 'n', 's']); //=> ['b', 'a', 'n', 'a', 'n', 'a', 's']
 */
var intersperse = _curry2(_checkForMethod('intersperse', function _intersperse(separator, list) {
  var length = list.length;
  if (length === 0) { return []; }
  var out = Array(length * 2 - 1);
  var idx = 0;
  while (idx < length) {
    var i = idx * 2;
    if (idx === length - 1) {
      out[i] = list[idx];
    } else {
      out[i] = list[idx];
      out[i + 1] = separator;
    }
    idx += 1;
  }
  return out;
}));
export default intersperse;
