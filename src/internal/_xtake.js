var _curry2 = require('./_curry2');
var _reduced = require('./_reduced');


module.exports = (function() {
  function XTake(n, xf) {
    this.xf = xf;
    this.n = n;
  }
  XTake.prototype.init = function() {
    return this.xf.init();
  };
  XTake.prototype.result = function(result) {
    return this.xf.result(result);
  };
  XTake.prototype.step = function(result, input) {
    this.n -= 1;
    return this.n === 0 ? _reduced(this.xf.step(result, input))
                        : this.xf.step(result, input);
  };

  return _curry2(function _xtake(n, xf) { return new XTake(n, xf); });
})();
