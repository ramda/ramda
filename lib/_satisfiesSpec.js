/**
 * internal helper for `where`
 *
 * @private
 * @see R.where
 */
module.exports = function _satisfiesSpec(spec, parsedSpec, testObj) {
    if (spec === testObj) { return true; }
    if (testObj == null) { return false; }
    parsedSpec.fn = parsedSpec.fn || [];
    parsedSpec.obj = parsedSpec.obj || [];
    var key, val, idx = -1, fnLen = parsedSpec.fn.length, j = -1, objLen = parsedSpec.obj.length;
    while (++idx < fnLen) {
        key = parsedSpec.fn[idx];
        val = spec[key];
        if (!(key in testObj)) {
            return false;
        }
        if (!val(testObj[key], testObj)) {
            return false;
        }
    }
    while (++j < objLen) {
        key = parsedSpec.obj[j];
        if (spec[key] !== testObj[key]) {
            return false;
        }
    }
    return true;
};
