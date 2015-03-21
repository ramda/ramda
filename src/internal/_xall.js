var _curry2 = require('./_curry2');
var _reduced = require('./_reduced');


module.exports = (function() {
  function XAll(f, xf) {
    this.xf = xf;
    this.f = f;
    this.all = true;
  }
  XAll.prototype.init = function() {
    return this.xf.init();
  };
  XAll.prototype.result = function(result) {
    if (this.all) {
      result = this.xf.step(result, true);
    }
    return this.xf.result(result);
  };
  XAll.prototype.step = function(result, input) {
    if (!this.f(input)) {
      this.all = false;
      result = _reduced(this.xf.step(result, false));
    }
    return result;
  };

  return _curry2(function _xall(f, xf) { return new XAll(f, xf); });
})();
