import _isInteger from './_isInteger.js';
import _nth from './_nth.js';

/**
 * Retrieves the value at a given path. The nodes of the path can be arbitrary strings or non-negative integers.
 * For anything else, the value is unspecified. Integer paths are meant to index arrays, strings are meant for objects.
 *
 * @func
 * @category Object
 * @typedefn Idx = String | Int | Symbol
 * @sig ([Idx], {a}) -> a | Undefined
 * @sig Idx = String | NonNegativeInt
 * @param {Array} path The path to use.
 * @param {Object} obj The object or array to retrieve the nested property from.
 * @return {*} The data at `path`.
 * @example
 *
 *      path(['a', 'b'], {a: {b: 2}}); //=> 2
 *      path(['a', 'b'], {c: {b: 2}}); //=> undefined
 *      path(['a', 'b', 0], {a: {b: [1, 2, 3]}}); //=> 1
 *      path(['a', 'b', -2], {a: {b: [1, 2, 3]}}); //=> 2
 *      path([2], {'2': 2}); //=> 2
 *      path([-2], {'-2': 'a'}); //=> undefined
 */

function path(pathAr, obj) {
  let val = obj;
  for (let i = 0; i < pathAr.length; i += 1) {
    if (val == null) {
      return undefined;
    }

    const p = pathAr[i];
    if (_isInteger(p)) {
      val = _nth(p, val);
    } else {
      val = val[p];
    }
  }
  return val;
}

export default path;
