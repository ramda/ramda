var _curry2 = require('./_curry2');


module.exports = (function() {
  function XDropWhile(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  XDropWhile.prototype.init = function() {
    return this.xf.init();
  };
  XDropWhile.prototype.result = function(result) {
    return this.xf.result(result);
  };
  XDropWhile.prototype.step = function(result, input) {
    if (this.f) {
      if (this.f(input)) {
        return result;
      }
      this.f = null;
    }
    return this.xf.step(result, input);
  };

  return _curry2(function _xdropWhile(f, xf) { return new XDropWhile(f, xf); });
})();
