var _curry2 = require('./internal/_curry2');
var keys = require('./keys');
var reduce = require('./reduce');

/**
 * Creates a new object with the own properties of the provided object, but the
 * keys renamed according to the keysMap object as `{oldKey: newKey}`.
 * When some key is not found in the keysMap, then it's passed as-is.
 *
 * @sig {a: b} -> {a: *} -> {b: *}
 */
module.exports = _curry2(function rename(keysMap, obj) {
  return reduce(function(acc, key) {
    acc[keysMap[key] || key] = obj[key];
    return acc;
  }, {}, keys(obj));
});
