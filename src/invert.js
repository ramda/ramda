var _curry1 = require('./internal/_curry1');
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
    var props = keys(obj);
    var len = props.length;
    var idx = -1;
    var out = {};

    while (++idx < len) {
        var key = props[idx];
        var val = obj[key];
        var list = Object.prototype.hasOwnProperty.call(out, val) ? out[val] : (out[val] = []);
        list[list.length] = key;
    }
    return out;
});
