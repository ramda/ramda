import _reduced from './_reduced.js';
import _xfBase from './_xfBase.js';


function XAll(f, xf) {
  this.xf = xf;
  this.f = f;
  this.all = true;
}
XAll.prototype['@@transducer/init'] = _xfBase.init;
XAll.prototype['@@transducer/result'] = function(result) {
  if (this.all) {
    result = this.xf['@@transducer/step'](result, true);
  }
  return this.xf['@@transducer/result'](result);
};
XAll.prototype['@@transducer/step'] = function(result, input) {
  if (!this.f(input)) {
    this.all = false;
    result = _reduced(this.xf['@@transducer/step'](result, false));
  }
  return result;
};

export default function _xall(f) {
  return function(xf) { return new XAll(f, xf); };
}
