import _curry2 from './internal/_curry2.js';
import paths from './paths.js';

/**
 * Retrieve the value at a given path. String `Idx` that could be parsed as
 * non-negative integers has the same lookup behavior as their Integer
 * counterparts. Non-negative integer `Idx` only work on an Array `obj`.
 *
 * @func
 * @memberOf R
 * @since v0.2.0
 * @category Object
 * @typedefn Idx = String | Int | Symbol
 * @sig [Idx] -> {a} -> a | Undefined
 * @param {Array} path The path to use.
 * @param {Object} obj The object or array to retrieve the nested property from.
 * @return {*} The data at `path`.
 * @see R.prop, R.nth
 * @example
 *
 *      R.path(['a', 'b'], {a: {b: 2}}); //=> 2
 *      R.path(['a', 'b'], {c: {b: 2}}); //=> undefined
 *      R.path(['a', 'b', 0], {a: {b: [1, 2, 3]}}); //=> 1
 *      R.path(['a', 'b', -2], {a: {b: [1, 2, 3]}}); //=> 2
 *      R.path([2], {'2': 2}); //=> 2
 *      R.path([-2], {'-2': 'a'}); //=> undefined
 */

var path = _curry2(function path(pathAr, obj) {
  return paths([pathAr], obj)[0];
});
export default path;
