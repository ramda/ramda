var _curry2 = require('./_curry2');
var _reduced = require('./_reduced');


module.exports = (function() {
  function XTakeWhile(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  XTakeWhile.prototype.init = function() {
    return this.xf.init();
  };
  XTakeWhile.prototype.result = function(result) {
    return this.xf.result(result);
  };
  XTakeWhile.prototype.step = function(result, input) {
    return this.f(input) ? this.xf.step(result, input) : _reduced(result);
  };

  return _curry2(function _xtakeWhile(f, xf) { return new XTakeWhile(f, xf); });
})();
