var _curry2 = require('./_curry2');
var _reduced = require('./_reduced');


module.exports = (function() {
  function XAny(f, xf) {
    this.xf = xf;
    this.f = f;
    this.any = false;
  }
  XAny.prototype.init = function() {
    return this.xf.init();
  };
  XAny.prototype.result = function(result) {
    if (!this.any) {
      result = this.xf.step(result, false);
    }
    return this.xf.result(result);
  };
  XAny.prototype.step = function(result, input) {
    if (this.f(input)) {
      this.any = true;
      result = _reduced(this.xf.step(result, true));
    }
    return result;
  };

  return _curry2(function _xany(f, xf) { return new XAny(f, xf); });
})();
