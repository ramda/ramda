import _reduced from './_reduced';
import _xfBase from './_xfBase';


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

export default XFind;
