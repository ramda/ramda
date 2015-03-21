var _curry2 = require('./_curry2');


module.exports = (function() {
  function XMap(f, xf) {
    this.xf = xf;
    this.f = f;
  }
  XMap.prototype.init = function() {
    return this.xf.init();
  };
  XMap.prototype.result = function(result) {
    return this.xf.result(result);
  };
  XMap.prototype.step = function(result, input) {
    return this.xf.step(result, this.f(input));
  };

  return _curry2(function _xmap(f, xf) { return new XMap(f, xf); });
})();
