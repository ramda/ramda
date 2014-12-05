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
 *      var obj = {
 *        foo: 1,
 *        bar: 2,
 *      };
 *      R.has('foo', obj);  //=> true
 *
 *      var list = [{foo: 1}, {foo: 2}, {bar: 3}];
 *      R.filter(R.has('foo'), list);  //=> [{foo: 1}, {foo: 2}]
 */
module.exports = _curry2(function(prop, obj) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
});
