var keys = require('./keys');

/**
 * Returns a new object with the keys of the given object
 * as values, and the values of the given object as keys.
 *
 * @func
 * @memberOf R
 * @category Object
 * @sig {s: x} -> {x: s}
 * @param {Object} obj The object or array to invert
 * @return {Object} out A new object
 * @example
 *
 *      var raceResults = {
 *        first: 'alice',
 *        second: 'jake'
 *      };
 *      R.invertObj(raceResults);
 *      //=> { 'alice': 'first', 'jake':'second' }
 *
 *      // Alternatively:
 *      var raceResults = ['alice', 'jake'];
 *      R.invertObj(raceResults);
 *      //=> { 'alice': '0', 'jake':'1' }
 */
module.exports = function invertObj(obj) {
    var props = keys(obj),
        len = props.length,
        idx = -1,
        out = {};

    while (++idx < len) {
        var key = props[idx];
        out[obj[key]] = key;
    }

    return out;
};
