import _reduced from './_reduced.js';
import _xfBase from './_xfBase.js';


function XTakeWhile(f, xf) {
  this.xf = xf;
  this.f = f;
}
XTakeWhile.prototype['@@transducer/init'] = _xfBase.init;
XTakeWhile.prototype['@@transducer/result'] = _xfBase.result;
XTakeWhile.prototype['@@transducer/step'] = function(result, input) {
  return this.f(input) ? this.xf['@@transducer/step'](result, input) : _reduced(result);
};

export default function _xtakeWhile(f) {
  return function(xf) { return new XTakeWhile(f, xf); };
}
