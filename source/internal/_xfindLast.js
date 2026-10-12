import _unreduced from './_unreduced.js';
import _xfBase from './_xfBase.js';


function XFindLast(f, xf) {
  this.xf = xf;
  this.f = f;
}
XFindLast.prototype['@@transducer/init'] = _xfBase.init;
XFindLast.prototype['@@transducer/result'] = function(result) {
  result = _unreduced(this.xf['@@transducer/step'](result, this.last));
  return this.xf['@@transducer/result'](result);
};
XFindLast.prototype['@@transducer/step'] = function(result, input) {
  if (this.f(input)) {
    this.last = input;
  }
  return result;
};

export default function _xfindLast(f) {
  return function(xf) { return new XFindLast(f, xf); };
}
