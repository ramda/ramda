var _curry1 = require('./internal/_curry1');
var _has = require('./internal/_has');
var keys = require('./keys');


/**
 * Same as R.invertObj, however this accounts for objects
 * with duplicate values by putting the values into an
 * array.
 *
 * @func
 * @memberOf R
 * @category Object
 * @sig {s: x} -> {x: [ s, ... ]}
 * @param {Object} obj The object or array to invert
 * @return {Object} out A new object with keys
 * in an array.
 * @example
 *
 *      var raceResultsByFirstName = {
 *        first: 'alice',
 *        second: 'jake',
 *        third: 'alice',
 *      };
 *      R.invert(raceResultsByFirstName);
 *      //=> { 'alice': ['first', 'third'], 'jake':['second'] }
 *
 */
module.exports = _curry1(function invert(obj) {
    var result = {};
    var props = keys(obj);
    for (var idx = 0, len = props.length; idx < len; idx += 1) {
        var key = props[idx];
        var val = obj[key];
        if (!_has(val, result)) {
            result[val] = [];
        }
        result[val].push(key);
    }
    return result;
});
