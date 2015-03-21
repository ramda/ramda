var _cloneRegExp = require('./_cloneRegExp');
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
    var len = refFrom.length;
    var idx = -1;
    while (++idx < len) {
      if (value === refFrom[idx]) {
        return refTo[idx];
      }
    }
    refFrom[idx + 1] = value;
    refTo[idx + 1] = copiedValue;
    for (var key in value) {
      copiedValue[key] = _baseCopy(value[key], refFrom, refTo);
    }
    return copiedValue;
  };
  switch (type(value)) {
    case 'Object':  return copy({});
    case 'Array':   return copy([]);
    case 'Date':    return new Date(value);
    case 'RegExp':  return _cloneRegExp(value);
    default:        return value;
  }
};
