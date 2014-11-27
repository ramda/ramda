/**
 * Creates a deep copy of the value which may contain (nested) `Array`s and
 * `Object`s, `Number`s, `String`s, `Boolean`s and `Date`s. `Function`s are
 * not copied, but assigned by their reference.
 *
 * @func
 * @memberOf R
 * @category Object
 * @sig {*} -> {*}
 * @param {*} value The object or array to clone
 * @return {*} A new object or array.
 * @example
 *
 *      var objects = [{}, {}, {}];
 *      var objectsClone = R.cloneDeep(objects);
 *      objects[0] === objectsClone[0]; //=> false
 *
 */
R.cloneDeep = function cloneDeep(value) {
    return _baseCopy(value, [], []);
};
