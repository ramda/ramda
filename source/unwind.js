import _curry2 from './internal/_curry2.js';
import has from './has.js';
import propIs from './propIs.js';
import reduce from './reduce.js';
import clone from './clone.js';
import dissoc from './dissoc.js';
import assoc from './assoc.js';

/**
 *
 * Deconstructs an array field from the input documents to output a document for each element.
 * Each output document is the input document with the value of the array field replaced by the element.
 *
 * @func
 * @memberOf R
 * @category Object
 * @sig String -> {k: [v]} -> [{k: v}]
 * @param {String} key The key to determine which property of the object should be unwind
 * @param {Object} object The object containing list under property named as key which is to unwind
 * @return {List} A new list of object containing the value of input key having list replaced by each element in the object.
 * @example
 *
 *  R.unwind('hobbies', {
 *  name: 'alice',
 *  hobbies: ['Golf', 'Hacking'],
 *  colors: ['red', 'green'],
 * });
 * // => [
 * //      { name: 'alice', hobbies: 'Golf', colors: ['red', 'green'] },
 * //      { name: 'alice', hobbies: 'Hacking', colors: ['red', 'green'] }
 * // ]
 */

var unwind = _curry2(function(key, object) {
  // If prop as key is not in Object or prop as key is not an List in Object
  if (!(has(key, object) && propIs(Array, key, object))) { return [object]; }
  // Reduce Function
  var fn = function(acc, item) {
    // Cloning
    var clonedObject = clone(object);
    // Removing key from newly cloned object
    var dissocObject = dissoc(key, clonedObject);
    // Adding key to newly dissocated object
    var assocObject = assoc(key, item, dissocObject);
    // Adding assocated object to Accumulator
    acc.push(assocObject);
    return acc;
  };
  // Reduce over object[key] which is an list
  // Initialize Accumulator with empty list
  return reduce(fn, [], object[key]);
});

export default unwind;
