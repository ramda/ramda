import _has from './_has';


var toStringFunc = Object.prototype.toString;
var _isArguments = function() {
  return toStringFunc.call(arguments) === '[object Arguments]' ?
    function _isArguments(x) { return toStringFunc.call(x) === '[object Arguments]'; } :
    function _isArguments(x) { return _has('callee', x); };
};

export default _isArguments;
