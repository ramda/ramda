import _curry2 from './internal/_curry2.js';
import _isArray from './internal/_isArray.js';
import _map from './internal/_map.js';
import unwind from './unwind.js';

/**
 *
 * Takes a list of keys and unwind the input document with all the keys individually to produce output document.
 *
 * @func
 * @memberOf R
 * @category Object
 * @sig [String] -> {k: [v]} -> [[{k: v}]]
 * @param {String} key The key to determine which property of the object should be unwind
 * @param {Object} object The object containing list under property named as key which is to unwind
 * @return {List} A new list of unwind objects.
 * @see R.unwind
 * @example
 *
 * R.unwindAll(['hobbies', 'colors'], {
 *   name: 'alice',
 *   hobbies: ['Golf', 'Hacking'],
 *   colors: ['red', 'green'],
 * });
 * // [
 * //   [
 * //     { name: 'alice', hobbies: 'Golf', colors: ['red', 'green'] },
 * //     { name: 'alice', hobbies: 'Hacking', colors: ['red', 'green'] }
 * //   ],
 * //   [
 * //     { name: 'alice', hobbies: ['Golf', 'Hacking'], colors: 'red' },
 * //     { name: 'alice', hobbies: ['Golf', 'Hacking'], colors: 'green' }
 * //   ]
 * // ]
 */

var unwindAll = _curry2(function(keys, object) {
  // If keys is not as a list
  if (!(_isArray(keys) && keys.length)) {
    return [[object]];
  }
  // Map over keys which is a list and unwind object with key
  return _map(function(key) {
    return unwind(key, object);
  }, keys);
});

export default unwindAll;
