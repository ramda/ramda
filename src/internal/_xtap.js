var _curry2 = require('./_curry2');
var _xfBase = require('./_xfBase');


module.exports = (function() {
  function XTap(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  XTap.prototype['@@transducer/init'] = _xfBase.init;
  XTap.prototype['@@transducer/result'] = _xfBase.result;
  XTap.prototype['@@transducer/step'] = function(result, input) {
    this.f(input);
    return this.xf['@@transducer/step'](result, input);
  };

  return _curry2(function _xtap(f, xf) { return new XTap(f, xf); });
}());
