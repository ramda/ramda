var _curry3 = require('./internal/_curry3');


/**
 * Similar to `pick` except that this one includes a `key: <default>` pair for
 * properties that don't exist
 *
 * **Note:** A property set to undefined will be left untouched.
 *
 * @func
 * @memberOf R
 * @since v0.22.2
 * @category Object
 * @sig [k] -> * -> {k: v} -> {k: v}
 * @param {Array} names an array of String property names to copy onto a new object
 * @param * default value when encountering undefined
 * @param {Object} obj The object to copy from
 * @return {Object} A new object with only properties from `names` on it.
 * @see R.pick
 * @example
 *
 *      R.pickWithDefault(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, d: 4}
 *      R.pickWithDefault(['a', 'e', 'f'], null, {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, e: null, f: null}
 */
module.exports = _curry3(function pickWithDefault(names, def, obj) {
  var result = {};
  var idx = 0;
  while (idx < names.length) {
    result[names[idx]] = (names[idx] in obj)
      ?  obj[names[idx]]
      : def

    idx += 1;
  }
  return result;
});
