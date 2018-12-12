import _reduced from './_reduced';
import _xfBase from './_xfBase';


function XAny(f, xf) {
  this.xf = xf;
  this.f = f;
  this.any = false;
}
XAny.prototype['@@transducer/init'] = _xfBase.init;
XAny.prototype['@@transducer/result'] = function(result) {
  if (!this.any) {
    result = this.xf['@@transducer/step'](result, false);
  }
  return this.xf['@@transducer/result'](result);
};
XAny.prototype['@@transducer/step'] = function(result, input) {
  if (this.f(input)) {
    this.any = true;
    result = _reduced(this.xf['@@transducer/step'](result, true));
  }
  return result;
};

export default XAny;
