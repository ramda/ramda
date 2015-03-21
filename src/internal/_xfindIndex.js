var _curry2 = require('./_curry2');
var _reduced = require('./_reduced');


module.exports = (function() {
  function XFindIndex(f, xf) {
    this.xf = xf;
    this.f = f;
    this.idx = -1;
    this.found = false;
  }
  XFindIndex.prototype.init = function() {
    return this.xf.init();
  };
  XFindIndex.prototype.result = function(result) {
    if (!this.found) {
      result = this.xf.step(result, -1);
    }
    return this.xf.result(result);
  };
  XFindIndex.prototype.step = function(result, input) {
    this.idx += 1;
    if (this.f(input)) {
      this.found = true;
      result = _reduced(this.xf.step(result, this.idx));
    }
    return result;
  };

  return _curry2(function _xfindIndex(f, xf) { return new XFindIndex(f, xf); });
})();
