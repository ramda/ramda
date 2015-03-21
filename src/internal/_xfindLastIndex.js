var _curry2 = require('./_curry2');


module.exports = (function() {
  function XFindLastIndex(f, xf) {
    this.xf = xf;
    this.f = f;
    this.idx = -1;
    this.lastIdx = -1;
  }
  XFindLastIndex.prototype.init = function() {
    return this.xf.init();
  };
  XFindLastIndex.prototype.result = function(result) {
    return this.xf.result(this.xf.step(result, this.lastIdx));
  };
  XFindLastIndex.prototype.step = function(result, input) {
    this.idx += 1;
    if (this.f(input)) {
      this.lastIdx = this.idx;
    }
    return result;
  };

  return _curry2(function _xfindLastIndex(f, xf) { return new XFindLastIndex(f, xf); });
})();
