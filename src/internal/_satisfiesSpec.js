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
    var key, val;
    for (var idx = 0, len = parsedSpec.fn.length; idx < len; idx += 1) {
        key = parsedSpec.fn[idx];
        val = spec[key];
        if (!(key in testObj)) {
            return false;
        }
        if (!val(testObj[key], testObj)) {
            return false;
        }
    }
    for (idx = 0, len = parsedSpec.obj.length; idx < len; idx += 1) {
        key = parsedSpec.obj[idx];
        if (spec[key] !== testObj[key]) {
            return false;
        }
    }
    return true;
};
