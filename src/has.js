var _curry2 = require('./internal/_curry2');


/**
 * Returns whether or not an object has an own property with
 * the specified name
 *
 * @func
 * @memberOf R
 * @category Object
 * @sig String -> {String: *} -> Boolean
 * @param {String} prop The name of the property to check for.
 * @param {Object} obj The object to query.
 * @return {Boolean} Whether the property exists.
 * @example
 *
 *      var hasName = R.has('name');
 *      hasName({name: 'alice'});   //=> true
 *      hasName({name: 'bob'});     //=> true
 *      hasName({});                //=> false
 *
 *      var point = {x: 0, y: 0};
 *      var pointHas = R.has(R.__, point);
 *      pointHas('x');  //=> true
 *      pointHas('y');  //=> true
 *      pointHas('z');  //=> false
 */
module.exports = _curry2(function has(prop, obj) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
});
