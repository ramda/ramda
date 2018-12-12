import _reduced from './_reduced';
import _xfBase from './_xfBase';


function XFindIndex(f, xf) {
  this.xf = xf;
  this.f = f;
  this.idx = -1;
  this.found = false;
}
XFindIndex.prototype['@@transducer/init'] = _xfBase.init;
XFindIndex.prototype['@@transducer/result'] = function(result) {
  if (!this.found) {
    result = this.xf['@@transducer/step'](result, -1);
  }
  return this.xf['@@transducer/result'](result);
};
XFindIndex.prototype['@@transducer/step'] = function(result, input) {
  this.idx += 1;
  if (this.f(input)) {
    this.found = true;
    result = _reduced(this.xf['@@transducer/step'](result, this.idx));
  }
  return result;
};

export default XFindIndex;
