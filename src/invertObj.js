var _curry1 = require('./internal/_curry1');
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
module.exports = _curry1(function invertObj(obj) {
    var result = {};
    var props = keys(obj);
    for (var idx = 0, len = props.length; idx < len; idx += 1) {
        result[obj[props[idx]]] = props[idx];
    }
    return result;
});
