import _reduce from './_reduce.js';
import _xfBase from './_xfBase.js';
import bind from '../bind.js';


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
  result = _reduce(
    bind(this.xf['@@transducer/step'],this.xf),
    result,
    this.retained
  );
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
