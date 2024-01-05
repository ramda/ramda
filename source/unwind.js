import _curry2 from './internal/_curry2.js';
import _isArray from './internal/_isArray.js';
import _map from './internal/_map.js';
import _assoc from './internal/_assoc.js';

/**
 *
 * Deconstructs an array field from the input documents to output a document for each element.
 * Each output document is the input document with the value of the array field replaced by the element.
 *
 * @func
 * @memberOf R
 * @since v0.28.0
 * @category Object
 * @sig String -> {k: [v]} -> [{k: v}]
 * @param {String} key The key to determine which property of the object should be unwound.
 * @param {Object} object The object containing the list to unwind at the property named by the key.
 * @return {List} A list of new objects, each having the given key associated to an item from the unwound list.
 * @example
 *
 * R.unwind('hobbies', {
 *   name: 'alice',
 *   hobbies: ['Golf', 'Hacking'],
 *   colors: ['red', 'green'],
 * });
 * // [
 * //   { name: 'alice', hobbies: 'Golf', colors: ['red', 'green'] },
 * //   { name: 'alice', hobbies: 'Hacking', colors: ['red', 'green'] }
 * // ]
 */

var unwind = _curry2(function(key, object) {
  // If key is not in object or key is not as a list in object
  if (!(key in object && _isArray(object[key]))) {
    return [object];
  }
  // Map over object[key] which is a list and assoc each element with key
  return _map(function(item) {
    return _assoc(key, item, object);
  }, object[key]);
});

export default unwind;
