var _cloneRegExp = require('./_cloneRegExp');
var type = require('../type');

module.exports = (function() {
  var copy = function copy(copiedValue, value, refFrom, refTo, deep) {
    var len = refFrom.length;
    var idx = 0;
    while (idx < len) {
      if (value === refFrom[idx]) {
        return refTo[idx];
      }
      idx += 1;
    }
    refFrom[idx + 1] = value;
    refTo[idx + 1] = copiedValue;
    for (var key in value) {
      copiedValue[key] = deep ?
        _clone(value[key], refFrom, refTo, true) : value[key];
    }
    return copiedValue;
  };

  /**
   * Copies an object.
   *
   * @private
   * @param {*} value The value to be copied
   * @param {Array} refFrom Array containing the source references
   * @param {Array} refTo Array containing the copied source references
   * @param {Boolean} deep Whether or not to perform deep cloning.
   * @return {*} The copied value.
   */
  var _clone = function(value, refFrom, refTo, deep) {
    switch (type(value)) {
      case 'Object':  return copy({}, value, refFrom, refTo, deep);
      case 'Array':   return copy([], value, refFrom, refTo, deep);
      case 'Date':    return new Date(value.valueOf());
      case 'RegExp':  return _cloneRegExp(value);
      default:        return value;
    }
  };

  return _clone;
}());
