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
module.exports = function invert(obj) {
    var props = keys(obj),
        len = props.length,
        idx = -1,
        out = {};

    while (++idx < len) {
        var key = props[idx],
            val = obj[key];

        out[val] = out[val] || [];
        out[val].push(key);
    }

    return out;
};
