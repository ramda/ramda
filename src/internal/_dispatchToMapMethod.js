var _mapFunctions = require('./_mapFunctions');
var _objectFunctions = require('./_objectFunctions');


module.exports = (function() {
  return typeof Map === 'function' ?
    function _dispatchToMapMethod(methodname) {
      return function() {
        var isMap = arguments[arguments.length - 1] instanceof Map;
        return (isMap ? _mapFunctions : _objectFunctions)[methodname].apply(null, arguments);
      };
    } :
    function _callObjectMethod(methodname) {
      return _objectFunctions[methodname];
    };
}());
