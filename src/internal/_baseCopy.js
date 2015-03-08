var type = require('../type');


/**
 * Copies an object.
 *
 * @private
 * @param {*} value The value to be copied
 * @param {Array} refFrom Array containing the source references
 * @param {Array} refTo Array containing the copied source references
 * @return {*} The copied value.
 */
module.exports = function _baseCopy(value, refFrom, refTo) {
    var copy = function copy(copiedValue) {
        for (var idx = 0, len = refFrom.length; idx < len; idx += 1) {
            if (value === refFrom[idx]) {
                return refTo[idx];
            }
        }
        refFrom.push(value);
        refTo.push(copiedValue);
        for (var key in value) {
            copiedValue[key] = _baseCopy(value[key], refFrom, refTo);
        }
        return copiedValue;
    };
    switch (type(value)) {
        case 'Object':  return copy({});
        case 'Array':   return copy([]);
        case 'Date':    return new Date(value);
        default:        return value;
    }
};
