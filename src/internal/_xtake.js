var _curry2 = require('./_curry2');
var _reduced = require('./_reduced');
var _xfBase = require('./_xfBase');


module.exports = (function() {
  function XTake(n, xf) {
    this.xf = xf;
    this.n = n;
  }
  XTake.prototype['@@transducer/init'] = _xfBase.init;
  XTake.prototype['@@transducer/result'] = _xfBase.result;
  XTake.prototype['@@transducer/step'] = function(result, input) {
    this.n -= 1;
    return this.n === 0 ? _reduced(this.xf['@@transducer/step'](result, input))
                        : this.xf['@@transducer/step'](result, input);
  };

  return _curry2(function _xtake(n, xf) { return new XTake(n, xf); });
})();
