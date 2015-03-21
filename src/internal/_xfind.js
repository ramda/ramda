var _curry2 = require('./_curry2');
var _reduced = require('./_reduced');


module.exports = (function() {
  function XFind(f, xf) {
    this.xf = xf;
    this.f = f;
    this.found = false;
  }
  XFind.prototype.init = function() {
    return this.xf.init();
  };
  XFind.prototype.result = function(result) {
    if (!this.found) {
      result = this.xf.step(result, void 0);
    }
    return this.xf.result(result);
  };
  XFind.prototype.step = function(result, input) {
    if (this.f(input)) {
      this.found = true;
      result = _reduced(this.xf.step(result, input));
    }
    return result;
  };

  return _curry2(function _xfind(f, xf) { return new XFind(f, xf); });
})();
