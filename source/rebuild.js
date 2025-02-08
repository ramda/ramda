import _curry2 from './internal/_curry2.js';
import _rebuild from './internal/_rebuild.js';

/**
 * Transforms an object into a new one, applying to every key-value pair a
 * function creating zero, one, or many new key-value pairs, and combining
 * the resulst into a single object.
 *
 * @func
 * @memberOf R
 * @category List
 * @sig ([String, a] -> [[String, b]]) -> Object<a> -> Object<b>
 * @param {Function} convert A function that converts a key and a value to an array of key-value arrays.
 * @param {Object} obj The structure to convert
 * @return {Array} A new object whose key-value pairs are the result of applying the `convert` function
 *         to every key-value pair in `obj`.
 * @example
 *
 *      R.rebuild((k, v) => [[k.toUpperCase(), v * v]], {a: 1, b: 2, c: 3}) //=> {A: 1, B: 4, C: 9}
 */
var rebuild = _curry2(_rebuild);
export default rebuild;
