import _xfBase from './_xfBase.js';
import _promap from './_promap.js';


function XPromap(f, g, xf) {
  this.xf = xf;
  this.f = f;
  this.g = g;
}
XPromap.prototype['@@transducer/init'] = _xfBase.init;
XPromap.prototype['@@transducer/result'] = _xfBase.result;
XPromap.prototype['@@transducer/step'] = function(result, input) {
  return this.xf['@@transducer/step'](result, _promap(this.f, this.g, input));
};

export default function _xpromap(f, g) {
  return function(xf) { return new XPromap(f, g, xf); };
}
