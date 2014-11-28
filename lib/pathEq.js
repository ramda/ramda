var _curry3 = require('./_curry3');
var _path = require('./_path');


/**
 * Determines whether a nested path on an object, seperated by periods,
 * has a specific value according to strict equality ('==='). Most
 * likely used to filter a list:
 *
 * @func
 * @memberOf R
 * @category relation
 * @sig String -> v -> {k: v} -> Boolean
 * @param {String} path The path of the nested property to use
 * @param {*} val The value to compare the nested property with
 * @param {Object} obj The object to check the nested property in
 * @return {Boolean} `true` if the value equals the nested object property,
 *         `false` otherwise.
 * @example
 *
 *     var user1 = { address: { zipCode: 90210 } };
 *     var user2 = { address: { zipCode: 55555 } };
 *     var user3 = { name: 'Bob' };
 *     var users = [ user1, user2, user3 ]
 *     var isFamous = R.pathEq('address.zipCode', 90210);
 *     R.filter(isFamous, users); //=> [ user1 ]
 */
module.exports = _curry3(function(path, val, obj) {
    return _path(path.split('.'), obj) === val;
});
