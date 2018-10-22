import _curry2 from './internal/_curry2';


/**
 * Creates a new object by recursively applying transformation's map.
 * It calls transformation functions with source data, which can take any form,
 * and put their response in corresponding keys of the new object
 *
 * The new object will contain only mentioned keys, that may not be present in source `object`
 * If transformation won't be a `function` or an `object` the key will be set to `null`
 *
 * @func
 * @memberOf R
 * @category object
 * @sig {k: (v -> v)} -> a -> {k: v}
 * @param {Object} transformations The object specifying transformation functions to apply
 *        to the source data.
 * @param data to be called as argument for transform functions
 * @return {Object} The new object
 * @example
 *
 *    const numberStats = R.evolveTo({
 *      nums: R.always,
 *      sum: R.reduce(R.add, 0),
 *      multi: R.reduce(R.multiply, 1)
 *    })
 *    numberStats([1, 2, 3, 4]) //=> {nums: [1, 2, 3, 4], sum: 10, multi: 12}
 *
 */

var evolveTo = _curry2(function evolveTo(transformations, src) {
  var result = {};
  var transformation, key, type;
  for (key in transformations) {
    transformation = transformations[key];
    type = typeof transformation;
    result[key] = type === 'function'
      ? transformation(src)
      : transformation && type === 'object'
        ? evolveTo(transformation, src)
        : null;
  }
  return result;
});
export default evolveTo;
