/**
 * If the given object has an own property with the specified name,
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
 *      var favoriteWithDefault = R.propOr('favoriteLibrary', 'Ramda');
 *
 *      favorite(alice);  //=> undefined
 *      favoriteWithDefault(alice);  //=> 'Ramda'
 */
R.propOr = _curry3(function propOr(p, val, obj) {
    return _hasOwnProperty.call(obj, p) ? obj[p] : val;
});
