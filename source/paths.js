import _curry2 from './internal/_curry2';
import _isInteger from './internal/_isInteger';
import nth from './nth';

/**
 * Retrieves the values at given paths of an object.
 *
 * @func
 * @memberOf R
 * @category Object
 * @typedefn Idx = [String | Int]
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
        return;
      }
      p = paths[idx];
      val = _isInteger(p) ? nth(p, val) : val[p];
      idx += 1;
    }
    return val;
  });
});
export default paths;
