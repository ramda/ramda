var _curry3 = require('./internal/_curry3');


/**
 * If the given, non-null object has an own property with the specified name,
 * returns the value of that property.
 * Otherwise returns the provided default value.
 *
 * @func
 * @memberOf R
 * @category Object
 * @sig a -> String -> Object -> a
 * @param {*} val The default value.
 * @param {String} p The name of the property to return.
 * @param {Object} obj The object to query.
 * @return {*} The value of given property of the supplied object or the default value.
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
    return Object.prototype.hasOwnProperty.call(obj, p) ? obj[p] : val;
});
