import _curry2 from './internal/_curry2';
import _isInteger from './internal/_isInteger';
import nth from './nth';

/**
 * Retrieve the value at a given path.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category Object
 * @typedefn Idx = String | Int
 * @sig [Idx] -> {a} -> a | Undefined
 * @param {Array} path The path to use.
 * @param {Object} obj The object to retrieve the nested property from.
 * @return {*} The data at `path`.
 * @see R.prop
 * @example
 *
 *      R.path(['a', 'b'], {a: {b: 2}}); //=> 2
 *      R.path(['a', 'b'], {c: {b: 2}}); //=> undefined
 */
var path = _curry2(function path(paths, obj) {
  var val = obj;
  var idx = 0;
  var p;
  while (idx < paths.length) {
    if (val == null) {
      return;
    }
    p = paths[idx];
    val = _isInteger(p) ? nth(p, val) : val[p];
    idx += 1;
  }
  return val;
});
export default path;
