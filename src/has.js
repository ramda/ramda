var _curry2 = require('./internal/_curry2');


/**
 * Returns whether or not an object has an own property with
 * the specified name
 *
 * @func
 * @memberOf R
 * @category Object
 * @sig s -> {s: x} -> Boolean
 * @param {String} prop The name of the property to check for.
 * @param {Object} obj The object to query.
 * @return {Boolean} Whether the property exists.
 * @example
 *
 *      > R.has('foo', {foo: 1, bar: 2})
 *      true
 *
 *      > R.filter(R.has('foo'), [{foo: 1}, {foo: 2}, {bar: 3}])
 *      [{foo: 1}, {foo: 2}]
 */
module.exports = _curry2(function(prop, obj) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
});
