var _isString = require('./_isString');
var _slice = require('./_slice');


module.exports = function _asChars(f) {
  return function() {
    var idx = arguments.length - 1;
    var xs = arguments[idx];
    if (_isString(xs)) {
      var args = _slice(arguments);
      args[idx] = xs.split('');
      return f.apply(this, args).join('');
    } else {
      return f.apply(this, arguments);
    }
  };
};
