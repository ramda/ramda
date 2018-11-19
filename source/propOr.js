import _curry3 from './internal/_curry3';
import pathOr from './pathOr';


/**
 * If the given object has an property with the specified name, returns the value of that
 * property. Otherwise returns the provided default value.
 *
 * @func
 * @memberOf R
 * @since v0.6.0
 * @category Object
 * @sig a -> String -> Object -> a
 * @param {*} val The default value.
 * @param {String} p The name of the property to return.
 * @param {Object} obj The object to query.
 * @return {*} The value of given property of the supplied object or the default value.
 * @example
 *
 *      const alice = {
 *        name: 'ALICE',
 *        age: 101
 *      };
 *      const bob = {
 *        name: 'BOB',
 *        age: 61,
 *        favouriteLibrary: 'Ramda@0.26.0'
 *      };
 *      const favorite = R.prop('favoriteLibrary');
 *      const favoriteWithDefault = R.propOr('Ramda', 'favoriteLibrary');
 *
 *      favorite(alice);  //=> undefined
 *      favoriteWithDefault(alice);  //=> 'Ramda'
 *      favoriteWithDefault(Object.create(alice));  //=> 'Ramda'
 *      favoriteWithDefault(null);  //=> 'Ramda'
 *      favoriteWithDefault(bob);  //=> 'Ramda@0.26.0'
 */
var propOr = _curry3(function propOr(val, p, obj) {
  return pathOr(val, [p], obj);
});
export default propOr;
