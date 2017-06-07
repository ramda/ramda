var _curry2 = require('./internal/_curry2');
var type = require('./type');


/**
 * Takes a type name (as returned by [`type`](#type)) and a value of
 * any type, and returns `true` if the value is a member of the type
 * corresponding to the type name; `false` otherwise.
 *
 * Does not respect inheritance.
 *
 * @func
 * @memberOf R
 * @category Type
 * @sig String -> a -> Boolean
 * @param {String} typeName
 * @param {*} val
 * @return {Boolean}
 * @example
 *
 *      R.typeEq('Array', [1, 2, 3]); //=> true
 *      R.typeEq('Object', [1, 2, 3]); //=> false
 */
module.exports = _curry2(function typeEq(typeName, val) {
  return type(val) === typeName;
});
