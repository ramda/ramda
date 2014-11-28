var _contains = require('./_contains');
var _hasOwnProperty = require('./_hasOwnProperty');


/**
 * Returns a list containing the names of all the enumerable own
 * properties of the supplied object.
 * Note that the order of the output array is not guaranteed to be
 * consistent across different JS platforms.
 *
 * @func
 * @memberOf R
 * @category Object
 * @sig {k: v} -> [k]
 * @param {Object} obj The object to extract properties from
 * @return {Array} An array of the object's own properties.
 * @example
 *
 *      R.keys({a: 1, b: 2, c: 3}); //=> ['a', 'b', 'c']
 */
module.exports = (function() {
    // cover IE < 9 keys issues
    var hasEnumBug = !({toString: null}).propertyIsEnumerable('toString');
    var nonEnumerableProps = ['constructor', 'valueOf', 'isPrototypeOf', 'toString',
                              'propertyIsEnumerable', 'hasOwnProperty', 'toLocaleString'];

    return function keys(obj) {
        if (Object(obj) !== obj) {
            return [];
        }
        if (Object.keys) {
            return Object.keys(obj);
        }
        var prop, ks = [], nIdx;
        for (prop in obj) {
            if (_hasOwnProperty.call(obj, prop)) {
                ks[ks.length] = prop;
            }
        }
        if (hasEnumBug) {
            nIdx = nonEnumerableProps.length;
            while (nIdx--) {
                prop = nonEnumerableProps[nIdx];
                if (_hasOwnProperty.call(obj, prop) && !_contains(prop, ks)) {
                    ks[ks.length] = prop;
                }
            }
        }
        return ks;
    };
}());
