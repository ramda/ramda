var _curry3 = require('./internal/_curry3');
var has = require('./has');


/**
 * If the given, non-null object has an own property with the specified name,
 * returns the value of that property.
 * Otherwise returns the provided default value.
 *
 * @func
 * @memberOf R
 * @category Object
 * @sig s -> v -> {s: x} -> x | v
 * @param {String} p The name of the property to return.
 * @param {*} val The default value.
 * @param {Object} obj The object to query.
 * @return {*} The value of given property or default value.
 * @example
 *
 *      var alice = {
 *        name: 'ALICE',
 *        age: 101
 *      };
 *      var favorite = R.prop('favoriteLibrary');
 *      var favoriteWithDefault = R.propOr('Ramda', 'favoriteLibrary');
 *
 *      favorite(alice);  //=> undefined
 *      favoriteWithDefault(alice);  //=> 'Ramda'
 */
module.exports = _curry3(function propOr(val, p, obj) {
    return has(p, obj) ? obj[p] : val;
});
