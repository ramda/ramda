var _curry2 = require('./_curry2');


module.exports = (function() {
  function XFindLast(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  XFindLast.prototype.init = function() {
    return this.xf.init();
  };
  XFindLast.prototype.result = function(result) {
    return this.xf.result(this.xf.step(result, this.last));
  };
  XFindLast.prototype.step = function(result, input) {
    if (this.f(input)) {
      this.last = input;
    }
    return result;
  };

  return _curry2(function _xfindLast(f, xf) { return new XFindLast(f, xf); });
})();
