import _reduced from './_reduced.js';
import _xfBase from './_xfBase.js';


function XFind(f, xf) {
  this.xf = xf;
  this.f = f;
  this.found = false;
}
XFind.prototype['@@transducer/init'] = _xfBase.init;
XFind.prototype['@@transducer/result'] = function(result) {
  if (!this.found) {
    result = this.xf['@@transducer/step'](result, void 0);
  }
  return this.xf['@@transducer/result'](result);
};
XFind.prototype['@@transducer/step'] = function(result, input) {
  if (this.f(input)) {
    this.found = true;
    result = _reduced(this.xf['@@transducer/step'](result, input));
  }
  return result;
};

export default function _xfind(f) {
  return function(xf) { return new XFind(f, xf); };
}
