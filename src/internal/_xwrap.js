module.exports = (function() {
  function XWrap(fn) {
    this.f = fn;
  }
  XWrap.prototype.init = function() {
    throw new Error('init not implemented on XWrap');
  };
  XWrap.prototype.result = function(acc) { return acc; };
  XWrap.prototype.step = function(acc, x) {
    return this.f(acc, x);
  };

  return function _xwrap(fn) { return new XWrap(fn); };
}());
