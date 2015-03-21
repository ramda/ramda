var _curry2 = require('./_curry2');


module.exports = (function() {
  function XFilter(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  XFilter.prototype.init = function() {
    return this.xf.init();
  };
  XFilter.prototype.result = function(result) {
    return this.xf.result(result);
  };
  XFilter.prototype.step = function(result, input) {
    return this.f(input) ? this.xf.step(result, input) : result;
  };

  return _curry2(function _xfilter(f, xf) { return new XFilter(f, xf); });
})();
