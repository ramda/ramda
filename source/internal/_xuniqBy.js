import _Set from './_Set.js';
import _xfBase from './_xfBase.js';


function XUniqBy(f, xf) {
  this.xf = xf;
  this.f = f;
  this.set = new _Set();
}
XUniqBy.prototype['@@transducer/init'] = _xfBase.init;
XUniqBy.prototype['@@transducer/result'] = _xfBase.result;
XUniqBy.prototype['@@transducer/step'] = function(result, input) {
  return this.set.add(this.f(input)) ? this.xf['@@transducer/step'](result, input) : result;
};

export default function _xuniqBy(f) {
  return function(xf) { return new XUniqBy(f, xf); };
}
