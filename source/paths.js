import _curry2 from './internal/_curry2';
import _isInteger from './internal/_isInteger';
import nth from './nth';

/**
 * Retrieves the values at given paths of an object.
 *
 * @func
 * @memberOf R
 * @category Object
 * @typedefn Idx = [String | Int | Symbol]
 * @sig [Idx] -> {a} -> [a | Undefined]
 * @param {Array} pathsArray The array of paths to be fetched.
 * @param {Object} obj The object to retrieve the nested properties from.
 * @return {Array} A list consisting of values at paths specified by "pathsArray".
 * @see R.path
 * @example
 *
 *      R.paths([['a', 'b'], ['p', 0, 'q']], {a: {b: 2}, p: [{q: 3}]}); //=> [2, 3]
 *      R.paths([['a', 'b'], ['p', 'r']], {a: {b: 2}, p: [{q: 3}]}); //=> [2, undefined]
 */
var paths = _curry2(function paths(pathsArray, obj) {
  return pathsArray.map(function(paths) {
    var val = obj;
    var idx = 0;
    var p;
    while (idx < paths.length) {
      if (val == null) {
        throw new Error('Specified path not in object2');
      }

      p = paths[idx];

      if (
        _isInteger(p) &&
        Array.isArray(val) &&
        (
          (p < 0 && (val.length >= Math.abs(p))) ||
          (p >= 0 && p < val.length)
        )
      ) {
      // nth is only intended to be used on arrays.
      // Have to check array bounds because nth returns
      // undefined when the value is not in the list
      // and when the index is out of the range
        val = nth(p, val);
      } else if (
        val instanceof Object &&
        p in val) {
        val = val[p];
      } else {
        throw new Error('Specified path not in object');
      }
      idx += 1;

    }
    return val;
  });
});
export default paths;
