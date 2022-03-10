import _xfBase from './_xfBase.js';


function XFindLastIndex(f, xf) {
  this.xf = xf;
  this.f = f;
  this.idx = -1;
  this.lastIdx = -1;
}
XFindLastIndex.prototype['@@transducer/init'] = _xfBase.init;
XFindLastIndex.prototype['@@transducer/result'] = function(result) {
  return this.xf['@@transducer/result'](this.xf['@@transducer/step'](result, this.lastIdx));
};
XFindLastIndex.prototype['@@transducer/step'] = function(result, input) {
  this.idx += 1;
  if (this.f(input)) {
    this.lastIdx = this.idx;
  }
  return result;
};

export default function _xfindLastIndex(f) {
  return function(xf) { return new XFindLastIndex(f, xf); };
}
