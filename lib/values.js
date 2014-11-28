var keys = require('./keys');


/**
 * Returns a list of all the enumerable own properties of the supplied object.
 * Note that the order of the output array is not guaranteed across
 * different JS platforms.
 *
 * @func
 * @memberOf R
 * @category Object
 * @sig {k: v} -> [v]
 * @param {Object} obj The object to extract values from
 * @return {Array} An array of the values of the object's own properties.
 * @example
 *
 *      R.values({a: 1, b: 2, c: 3}); //=> [1, 2, 3]
 */
module.exports = function values(obj) {
    var props = keys(obj);
    var len = props.length;
    var vals = new Array(len);
    var idx = -1;
    while (++idx < len) {
        vals[idx] = obj[props[idx]];
    }
    return vals;
};
