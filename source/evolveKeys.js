import _curry2 from './internal/_curry2';


/**
 * Creates a new object by recursively transforming the keys based on the
 * supplied transformation function.
 *
 * A `transformation` function will not be invoked if its corresponding key
 * does not exist in the evolved object.
 *
 * @func
 * @memberOf R
 * @category Object
 * @sig {k: (v -> v)} -> {k: v} -> {k: v}
 * @param {Object} transformations The object specifying transformation functions to apply
 *        to the object.
 * @param {Object} object The object to be transformed.
 * @return {Object} The transformed object.
 * @example
 *
 *      const tomato = {firstName: 'John', lastName: 'Smith', emailAddress: 'foo@BAR.com'};
 *      const transformations = {
 *          firstName: R.toUpper,
 *          lastName: R.toLower
 *      };
 *      R.evolveKeys(transformations, tomato); //=> {FIRSTNAME: 'John', lastname: 'Smith', emailAddress: 'foo@BAR.com'}
 */
var evolveKeys = _curry2(function evolveKeys(transformations, object) {
  var result = {};
  var transformation, key, newKey, type;
  for (key in object) {
    transformation = transformations[key];
    type = typeof transformation;
    newKey = type === 'function'                 ? transformation(key)
                                                 : key;

    result[newKey] = transformation && type === 'object' ? evolveKeys(transformation, object[key])
                                                         : object[key];
  }
  return result;
});
export default evolveKeys;
