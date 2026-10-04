import _xfBase from './_xfBase.js';


function XDropLastWhile(fn, xf) {
  this.f = fn;
  this.retained = [];
  this.xf = xf;
}
XDropLastWhile.prototype['@@transducer/init'] = _xfBase.init;
XDropLastWhile.prototype['@@transducer/result'] = function(result) {
  this.retained = null;
  return this.xf['@@transducer/result'](result);
};
XDropLastWhile.prototype['@@transducer/step'] = function(result, input) {
  return this.f(input)
    ? this.retain(result, input)
    : this.flush(result, input);
};
XDropLastWhile.prototype.flush = function(result, input) {
  var idx = 0;
  while (idx < this.retained.length) {
    result = this.xf['@@transducer/step'](result, this.retained[idx]);
    if (result && result['@@transducer/reduced']) {
      return result;
    }
    idx += 1;
  }
  this.retained = [];
  return this.xf['@@transducer/step'](result, input);
};
XDropLastWhile.prototype.retain = function(result, input) {
  this.retained.push(input);
  return result;
};

export default function _xdropLastWhile(fn) {
  return function(xf) { return new XDropLastWhile(fn, xf); };
}
