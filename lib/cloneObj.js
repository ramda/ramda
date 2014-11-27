/**
 * Creates a shallow copy of an object's own properties.
 *
 * @func
 * @memberOf R
 * @category Object
 * @sig {*} -> {*}
 * @param {Object} obj The object to clone
 * @return {Object} A new object.
 * @example
 *
 *     R.cloneObj({a: 1, b: 2, c: [1, 2, 3]}); // {a: 1, b: 2, c: [1, 2, 3]}
 */
R.cloneObj = function(obj) {
    return _extend({}, obj);
};
